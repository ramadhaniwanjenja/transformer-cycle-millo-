# Grade Generator Calculator

Welcome to the **Grade Generator Calculator** - a simple Python-based application designed to help students, teachers, or anyone track academic performance more easily and clearly. This application allows you to enter your assignments, categorize them as either **Formative** or **Summative**, and get detailed results including **GPA** and **Pass/Fail** status.

## What This Application Does

This tool helps you:

- Enter and track multiple assignments with names, weights, and grades.
- Categorize assignments into **Formative** (e.g., quizzes, classwork) or **Summative** (e.g., exams, projects).
- Automatically calculate:
  - Weighted scores per category
  - Category averages
  - Final GPA (on a scale of 0 to 5.0)
  - Final result: **PASS** or **FAIL & REPEAT**

## Project Structure

```
grade_generator/
│
├── main.py                # Starts the program and displays results
├── assignment.py          # Defines how each assignment is stored and formatted
└── grade_calculator.py    # Handles input, validation, calculations, and result logic
```

## How to Run the Application

### 1. Requirements

- Make sure Python is installed on your computer (version 3.6 or higher).
- Download the project files.
- Open your terminal or command prompt.

### 2. Run the Program

```bash
python main.py
```

Upon running the main.py file, follow a series of on-screen prompts to enter your assignment details one by one.

## What You'll Be Asked

You'll be guided through these steps:

1. **Enter the name** of your assignment (e.g., "Quiz 1" or "Final Exam").
2. **Select a category**:
   - Formative (e.g., quizzes, classwork)
   - Summative (e.g., major exams, final project)
3. **Enter the weight** of the assignment (e.g., 20%).
   - The total weight for each category must not go beyond 100%.
4. **Enter the grade** you received (between 0 and 100).

You can keep adding multiple assignments, and when you're done, you will be prompted if you want to add another assignment, kindly select "n" for "no".

## Interaction Example

```
WELCOME TO THE GRADE GENERATOR CALCULATOR

Enter assignment name: Final Exam

Select category:
1. Formative
2. Summative

Enter choice (1/2): 2

Remaining weight in Summative: 100%

Enter assignment weight (as %): 60

Enter the grade obtained (0-100%): 70

Would you like to add another assignment? (y/n): y
...
```

At the end, you'll get a detailed breakdown of your grades, category averages, and your GPA.

## How Final Results Are Calculated

### GPA (Out of 5.0)

Your total weighted score is scaled to a GPA on a 5-point scale.

### Category Averages

Each category's average is calculated based on the total weight and grades for that category.

### Pass/Fail Criteria

To **pass** the course:

- **Formative Average ≥ 50%**
- **Summative Average ≥ 50%**

If either one is below 50%, the result is: **FAIL & REPEAT**

## Output Example

```
GRADE CALCULATION RESULTS

ASSIGNMENT SUMMARY:
1. Quiz 1 | Formative | Weight: 20% | Grade: 80% | Weighted: 16.00
2. Final Exam | Summative | Weight: 50% | Grade: 70% | Weighted: 35.00

CATEGORY TOTALS:
Formative Total Weighted Score: 16.00%
Summative Total Weighted Score: 35.00%

Formative Average: 80.00%
Summative Average: 70.00%

GPA: 2.55 / 5.00

FINAL REPORT: PASS

Bravo! You have successfully passed the course!
```

## Files Explained

| File | Description |
|------|-------------|
| main.py | Runs the entire program and handles the user interface. |
| assignment.py | Stores assignment info and handles individual weighted grade calculation. |
| grade_calculator.py | Core logic: input collection, validation, calculations, result display. |