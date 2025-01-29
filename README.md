# Lead Generation Platform

## 🎯 Portfolio Project Overview
This is a portfolio demonstration of a lead generation and email marketing automation platform that achieved a 30% increase in lead generation for client companies. The platform was actively used by businesses to automate their lead generation processes and track campaign performance.

![Dashboard Preview](frontend/public/images/image.png)

> **Note**: This is now a portfolio demonstration version of a previously active commercial project.

## 🌟 Key Features Demonstrated
- 📧 Email Campaign Management & Automation
- 👥 Lead Tracking System with Scoring (30% increase in lead generation)
- 📊 Real-time Analytics Dashboard
- 🏢 Multi-company Support
- 💌 Email Template Management
- 📈 Lead Scoring Algorithm
- 📱 Responsive Design
- 🔐 Role-based Access Control

## 🛠️ Tech Stack
### Frontend
- Next.js with TypeScript
- Tailwind CSS for styling
- React Context for state management
- Real-time updates with WebSocket
- Chart.js for analytics visualization

### Backend
- Django REST Framework
- JWT Authentication
- SQLite Database (simplified for demo)
- WebSocket support for real-time features

## 🚀 Demo Setup
This project includes sample data for demonstration purposes.

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Quick Start
1. Clone the repository
```bash
git clone [your-repo-url]
cd lead-gen-platform
```

2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py loaddata fixtures/demo_data.json  # Load sample data
python manage.py runserver
```

3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

4. Access the Demo
- Open http://localhost:3000
- Login with demo credentials:
  - Username: demo_admin
  - Password: demo123

## 📸 Screenshots
[Add your screenshots here]

## 🎯 Project Structure
```
├── frontend/
│   ├── app/              # Next.js pages and routing
│   ├── components/       # Reusable React components
│   ├── contexts/         # React Context providers
│   └── public/          # Static assets
├── backend/
│   ├── campaigns/       # Campaign management
│   ├── leads/           # Lead tracking
│   ├── companies/       # Company management
│   └── userauth/        # Authentication
```

## ✨ Features in Detail

### Campaign Management
- Create and manage email marketing campaigns
- Track campaign metrics (open rates, click rates, etc.)
- Schedule automated email sequences

### Lead Management
- Lead scoring system
- Lead status tracking
- Conversion funnel visualization
- Meeting scheduling integration

### Analytics Dashboard
- Real-time campaign performance metrics
- Lead conversion analytics
- Email engagement statistics
- ROI tracking

### Multi-company Support
- Separate workspaces for different companies
- Role-based access control
- Company-specific analytics

## 📝 Note for Employers
This project demonstrates my capabilities in:
- Full-stack development with modern technologies
- Complex system architecture
- User interface design
- Real-time data handling
- Authentication and authorization
- Analytics and data visualization
- Code organization and best practices

## 📄 License
This project is available for demonstration purposes only. All rights reserved. 