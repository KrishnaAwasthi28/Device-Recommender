<h1>🔌 Device Recommendation System</h1>

<p>
A backend-driven <strong>Device Recommendation System</strong> that integrates a
<strong>Java Spring Boot backend</strong> with a
<strong>Python-based recommendation engine</strong> to provide reliable and structured
device suggestions based on user inputs.
</p>

<p>
This project demonstrates <strong>cross-service communication</strong>,
<strong>API design</strong>, and <strong>backend reliability</strong>, making it suitable
for real-world scalable systems.
</p>

<hr/>

<h2>🚀 Features</h2>
<ul>
  <li>📡 REST-based communication between Java and Python services</li>
  <li>🧠 Python-powered recommendation logic</li>
  <li>🔐 Input validation and structured API responses</li>
  <li>⚙️ Backend orchestration using Spring Boot</li>
  <li>📊 Consistent and reliable recommendation results</li>
  <li>🧩 Modular architecture (backend + ML service separation)</li>
</ul>

<hr/>

<h2>🏗️ System Architecture</h2>

<pre>
Client
  │
  ▼
Spring Boot Backend (Java)
  │  REST API Call
  ▼
Python Recommendation Service
  │
  ▼
Recommended Devices (Response)
</pre>

<hr/>

<h2>🛠️ Tech Stack</h2>

<h3>Backend</h3>
<ul>
  <li>Java</li>
  <li>Spring Boot</li>
  <li>REST APIs</li>
  <li>Jackson (JSON Processing)</li>
</ul>

<h3>Recommendation Engine</h3>
<ul>
  <li>Python</li>
  <li>Custom Recommendation Logic (Rule-based / ML-based)</li>
</ul>

<h3>Tools</h3>
<ul>
  <li>Git & GitHub</li>
  <li>Postman (API Testing)</li>
</ul>

<hr/>

<h2>📂 Project Structure</h2>

<pre>
device-recommendation-system/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── dto/
│   └── DeviceRecommendationApplication.java
│
├── recommender-service/
│   ├── app.py
│   ├── recommendation_logic.py
│   └── requirements.txt
│
└── README.md
</pre>

<hr/>

<h2>🔄 How It Works</h2>

<ol>
  <li>Client sends device preferences (budget, features, usage type, etc.) to the Spring Boot backend</li>
  <li>Backend validates input and prepares a structured request</li>
  <li>Backend calls the Python recommendation service via REST API</li>
  <li>Python service processes the data and returns recommended devices</li>
  <li>Backend formats and sends the response back to the client</li>
</ol>

<hr/>

<h2>📡 API Flow (Backend → Python)</h2>

<h3>Request Example</h3>
<pre>
{
  "budget": 60000,
  "usageType": "Gaming",
  "preferredBrand": "Any"
}
</pre>

<h3>Response Example</h3>
<pre>
{
  "recommendedDevices": [
    {
      "name": "Device A",
      "price": 58000,
      "rating": 4.5
    },
    {
      "name": "Device B",
      "price": 62000,
      "rating": 4.3
    }
  ]
}
</pre>

<hr/>

<h2>🧠 Key Backend Learnings</h2>
<ul>
  <li>Designed clean REST API contracts between heterogeneous services</li>
  <li>Improved response consistency and fault tolerance</li>
  <li>Integrated ML/logic services into backend systems</li>
  <li>Strengthened service-to-service communication understanding</li>
</ul>

<hr/>

<h2>▶️ How to Run the Project</h2>

<h3>1️⃣ Run Python Recommendation Service</h3>
<pre>
cd recommender-service
pip install -r requirements.txt
python app.py
</pre>
<p>Runs on: <code>http://localhost:5000</code></p>

<h3>2️⃣ Run Spring Boot Backend</h3>
<pre>
cd backend
mvn spring-boot:run
</pre>
<p>Runs on: <code>http://localhost:8080</code></p>

<h3>3️⃣ Test Using Postman</h3>
<p>
Send POST request to:
<code>http://localhost:8080/api/recommend</code>
</p>

<hr/>

<h2>📌 Future Enhancements</h2>
<ul>
  <li>🔐 Add JWT-based authentication</li>
  <li>📈 Improve recommendation accuracy using ML models</li>
  <li>🐳 Dockerize backend and Python services</li>
  <li>☁️ Deploy services using AWS / Render</li>
  <li>📊 Add logging & monitoring</li>
</ul>

<hr/>

<h2>👨‍💻 Author</h2>
<p>
<strong>Krishna Awasthi</strong><br/>
Java Developer | Backend Developer | SDE Aspirant
</p>

<hr/>

<p>
⭐ If you find this project useful, consider giving it a star!
</p>
