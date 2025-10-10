import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import deviceData from "./device_dataset.json";

function Form() {
  const { deviceType } = useParams();
  const navigate = useNavigate();

  const [budgetOptions, setBudgetOptions] = useState([]);
  const [useCaseOptions, setUseCaseOptions] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [screenOptions, setScreenOptions] = useState([]);

  const [formData, setFormData] = useState({
    budget: "",
    useCase: "",
    brand: "",
    screenSize: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const filtered = deviceData.filter(
      (d) => d.device_type.toLowerCase() === deviceType.toLowerCase()
    );
    setBudgetOptions([...new Set(filtered.map((d) => d.budget_range))]);
    setUseCaseOptions([...new Set(filtered.map((d) => d.use_case))]);
    setBrandOptions([...new Set(filtered.map((d) => d.brand_preference))]);

    if (deviceType.toLowerCase() === "tablet") {
      setScreenOptions([
        ...new Set(
          filtered.map((d) => d.screen_size_pref).filter((s) => s && s !== "NA")
        ),
      ]);
    }
  }, [deviceType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      device_type: deviceType,
      use_case: formData.useCase,
      min_budget: parseInt(formData.budget.split("-")[0]),
      max_budget: parseInt(formData.budget.split("-")[1]),
      brand_preference: formData.brand,
      screen_size_pref: formData.screenSize || "",
    };

    const response = await axios.post("http://localhost:8080/api/recommend", payload);

    // Pass recommended devices to recommendations page
    navigate(`/recommendations/${deviceType}`, { state: { devices: response.data } });
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    alert("Failed to fetch recommendations.");
  }
};

  return (
    <div className="form-page">
      <h1>Tell Us Your {deviceType} Preferences</h1>
      <form className="device-form" onSubmit={handleSubmit}>
        <label>
          Budget Range:
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
          >
            <option value="">Select Budget</option>
            {budgetOptions.map((b, idx) => (
              <option key={idx} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        <label>
          Use Case:
          <select
            name="useCase"
            value={formData.useCase}
            onChange={handleChange}
            required
          >
            <option value="">Select Use Case</option>
            {useCaseOptions.map((u, idx) => (
              <option key={idx} value={u}>
                {u}
              </option>
            ))}
          </select>
        </label>

        <label>
          Preferred Brand:
          <select name="brand" value={formData.brand} onChange={handleChange}>
            <option value="">Any Brand</option>
            {brandOptions.map((b, idx) => (
              <option key={idx} value={b}>
                {b}
              </option>
            ))}
          </select>
        </label>

        {deviceType.toLowerCase() === "tablet" && (
          <label>
            Screen Size:
            <select
              name="screenSize"
              value={formData.screenSize}
              onChange={handleChange}
            >
              <option value="">Any Screen Size</option>
              {screenOptions.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Get Recommendations"}
        </button>
      </form>
    </div>
  );
}

export default Form;
