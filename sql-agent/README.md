# 🔍 NagarSeva — SQL Agent (Natural Language Database Query)

The SQL Agent is an **AI-powered natural language to SQL** system built with **LangChain**, **Groq LLM**, and **SQLAlchemy**. It allows administrators to ask questions about municipal data in plain English (or Hindi) and get professional, data-driven responses. A **Flask** interface provides a simple web frontend.

---

## 🗂️ Folder Structure

```
sql-agent/
├── SQLAgent.py      # Core agent — LLM setup, database connection, agent creation
├── db.py            # Standalone database connection test script
├── prompt.py        # System prompt for the Municipal Data Intelligence Engine
├── interface.py     # Flask web server — proxies requests to the agent
```

---

## 🧠 How It Works

```
User Question (Natural Language)
       │
       ▼
┌──────────────┐
│  Flask API   │  ← interface.py (port 3000)
│  /api/query  │
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│  LangChain Agent │  ← SQLAgent.py
│  (Groq LLM)      │
└──────┬───────────┘
       │  generates SQL
       ▼
┌──────────────────┐
│   PostgreSQL     │  ← via SQLAlchemy
│   (NagarSeva DB) │
└──────────────────┘
       │
       ▼
  Formatted Response (Markdown)
```

1. User sends a natural language question via the Flask API
2. LangChain SQL Agent receives the question with a specialized system prompt
3. The agent inspects the database schema, generates optimized SQL queries
4. Queries are executed read-only against the PostgreSQL database
5. Results are formatted into a professional response with insights and recommendations

---

## 📋 System Prompt Capabilities

The agent operates as a **Municipal Data Intelligence Engine** with these capabilities:

- **Schema Awareness**: Understands `User`, `Ward`, `Route`, `SurveySession`, `Issue`, and `Assignments` tables
- **Professional Analysis**: Provides executive summaries, data insights, and contextual significance
- **Read-Only**: Only executes `SELECT` queries — no mutations
- **No Hallucinations**: States clearly when data is missing
- **Markdown Output**: Uses tables, bold headers, and bullet points for scannable responses

### Example Questions
- *"What is the current progress and condition of our city?"*
- *"Show me the top 5 wards with the most unresolved potholes"*
- *"What is the resolution rate for each engineer?"*
- *"How many issues were detected in the last 7 days?"*

---

## 🔌 API Endpoints (Flask Interface)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Serve the web interface |
| `GET` | `/api/info` | Proxy — get agent info from FastAPI |
| `GET` | `/api/database` | Proxy — get database schema info |
| `POST` | `/api/query` | Send a natural language question, get AI-powered response |

### Example Request

```bash
curl -X POST http://localhost:3000/api/query \
  -H "Content-Type: application/json" \
  -d '{"question": "How many potholes are detected in Ward 1?"}'
```

---

## 🚀 Local Setup

### Prerequisites
- Python ≥ 3.10
- PostgreSQL database with NagarSeva schema (seeded via backend)

### Steps

```bash
# 1. Install dependencies
pip install langchain langchain-groq langchain-community langchain-openai \
  langchain-anthropic sqlalchemy python-dotenv flask requests

# 2. Set environment variables
export DATABASE_URL="postgresql://user:pass@localhost:5432/nagarseva"
export GROQ_API_KEY="your-groq-api-key"

# 3. Start the Flask interface
python interface.py
# Server starts on http://localhost:3000

# Or run the agent directly (CLI mode)
python SQLAgent.py
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `GROQ_API_KEY` | Groq API key for LLM inference | ✅ |

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `langchain` | Agent framework |
| `langchain-groq` | Groq LLM integration |
| `langchain-community` | SQL toolkit and database utilities |
| `sqlalchemy` | Database connection and ORM |
| `flask` | Web server for the interface |
| `python-dotenv` | Environment variable loading |

---

## ⚠️ Notes

- The agent uses **Groq's** `openai/gpt-oss-120b` model by default
- `db.py` is a standalone script for testing database connectivity — it connects directly and inspects tables
- The Flask interface (`interface.py`) proxies to a FastAPI backend at `FASTAPI_URL` (default: `http://localhost:5000`)
- For production, the SQL Agent is deployed on Render at `https://sql-agent-vmc-1.onrender.com`
