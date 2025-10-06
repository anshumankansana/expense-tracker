🚀 AI-Powered Expense Tracker - Development Documentation
Author: Anshuman Kansana
Date: 06/10/2025
Purpose: Internship Assignment
Development Time: 2 hours 30 minutes
Status: ✅ Complete and Production-Ready
website- 
1. How to Run the Application
1. Clone the GitHub repository: 
2. Open the index.html file in your browser.
3. Use the form to add expenses, filter by category/date, and view statistics.
4. Optional: Export expenses as CSV using the export button.
2. Key Features Implemented
•	Add expense with amount, category, date, and optional description.
•	Validate amount (must be positive) and date (cannot be future).
•	Display all expenses in a clean, responsive list with delete option.
•	Filter by category and date range.
•	Clear filters option.
•	Dashboard with total spent, average, number of transactions, and monthly budget.
•	Category breakdown chart (dynamic visual bar chart).
•	Export expenses to CSV.
•	Mobile-friendly and visually appealing design.
3. Cursor Usage Documentation
Prompts Used:
1.	“Generate a responsive expense tracker HTML layout with a modern card-based design.”
2.	“Write JS logic to validate input fields for amount and date, and dynamically update total spent and average.”
3.	“Create a category breakdown chart showing percentage spent per category in vanilla JS.”
4.	“Add filter functionality by category and date range.”
5.	“Generate CSV export functionality for all expenses in local storage.”
How Cursor Helped Solve Challenges:
- Helped structure the initial HTML/CSS layout quickly.
- Suggested efficient JS loops for filtering and chart calculation.
- Provided code snippets for responsive UI and dynamic DOM updates.
Modifications Made to AI-Generated Code:
- Adjusted styling for better color contrast and responsive design.
- Added budget alert feature when spending exceeds set monthly limit.
- Improved delete confirmation logic and chart update performance.
4. Challenges Faced & Solutions
- Filtering by date range: Initially buggy; fixed by parsing dates consistently in YYYY-MM-DD format.
- Responsive chart bars: Adjusted CSS for smooth width transition and proper alignment on mobile.
- Budget alert logic: Calculated current month expenses to trigger alert correctly.
5. Bonus Feature
- Monthly budget input with live alert when exceeded.
6. Screenshots
- 2-3 screenshots included in /screenshots folder showing:
1. Adding an expense
2. Filtering and statistics dashboard
3. Budget alert feature
7. Time Spent
- Design & Layout: 50 minutes
- Core JS Logic: 60 minutes
- Chart & Dashboard: 20 minutes
- Cursor AI Assistance & Debugging: 10 minutes
- Testing & Refinement: 10 minutes
Total: ~2 hours 30 minutes
