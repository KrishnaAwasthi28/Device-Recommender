package com.project.device_recommendation;

import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.*;
import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class RecommendationController {

    @PostMapping("/recommend")
    public List<Map<String, Object>> getRecommendations(@RequestBody Map<String, Object> input)
            throws IOException, InterruptedException {

        ObjectMapper mapper = new ObjectMapper();
        String inputJson = mapper.writeValueAsString(input);
        
        String pythonExe = "python3";
        String scriptPath = "./main.py";

        ProcessBuilder pb = new ProcessBuilder(pythonExe, scriptPath);
        pb.redirectErrorStream(true); // merge stdout and stderr (important!)
        Process process = pb.start();

        // Send input JSON to Python
        try (BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(process.getOutputStream()))) {
            writer.write(inputJson);
            writer.flush();
        }

        // Read Python output
        StringBuilder outputJson = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
            String line;
            while ((line = reader.readLine()) != null) {
                outputJson.append(line);
            }
        }

        int exitCode = process.waitFor();
        if (exitCode != 0) {
            throw new RuntimeException("Python script failed with exit code " + exitCode);
        }

        String resultStr = outputJson.toString().trim();
        if (resultStr.isEmpty()) {
            throw new RuntimeException("No response received from Python script.");
        }

        // Parse JSON output to Java List<Map>
        return mapper.readValue(resultStr, List.class);
    }
}
