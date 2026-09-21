# AI Customer Support Automation 🤖

An AI-powered customer support automation system that analyzes customer complaints, generates personalized responses, and automatically alerts the support team for high-priority issues.

## 🚀 Features

- Customer complaint submission through a React frontend
- FastAPI backend for handling support requests
- AI-based complaint classification
- Complaint categories:
  - Delivery
  - Payment
  - Product
  - Refund
  - Technical
  - Other
- Automatic priority detection:
  - Low
  - Medium
  - High
- Customer sentiment analysis
- Personalized AI-generated responses
- Automatic customer email responses using Gmail
- High-priority complaint alerts to the support team
- n8n workflow automation
- No database required

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- JavaScript
- CSS

### Backend
- Python
- FastAPI
- Pydantic
- Requests

### Automation & AI
- n8n
- AI-powered complaint analysis
- Gmail

## 🔄 Workflow

```text
Customer
   ↓
React Frontend
   ↓
FastAPI Backend
   ↓
n8n Webhook
   ↓
AI Complaint Analysis
   ↓
Parse AI Result
   ↓
Send Personalized Email
   ↓
Check Priority
   ↓
High Priority → Support Team Alert
