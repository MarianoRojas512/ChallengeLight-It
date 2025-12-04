# Playwright Automation Suite — DemoBlaze

This repository contains an automated test suite implemented with Playwright.
The objective is to validate the most critical functional flows of the DemoBlaze
application, focusing on high–business–value features such as product selection,
cart management, and the purchase flow.

The suite includes **three automated scenarios**, selected based on risk,
user impact, and regression importance.
---

## 1. Test Scenario: Add Product to Cart + Complete Purchase (Happy Path)

### **Why this test was selected**
This represents the **most critical business flow** in DemoBlaze.
If this flow fails, users cannot complete purchases, directly impacting revenue
and user trust. Automating it ensures fast detection of regressions in the checkout path.

---

## 2. Test Scenario: Cart Total Calculation (Add / Remove Products)

### **Why this test was selected**
Price calculation is **critical for checkout accuracy**.
DemoBlaze contains known inconsistencies when removing items from the cart,
making this a **high-risk area** and an excellent automation candidate.

This test ensures price integrity and guards against financial defects.

---

## 3. Test Scenario: Purchase Modal Validation (Negative Case)

### **Why this test was selected**
This scenario validates **input validation and user-data integrity**.
During manual testing, we identified a **high-severity defect**:
the purchase modal allows submitting empty fields, leading to invalid orders.

Automating this ensures the defect is tracked continuously and alerts the team
when validation breaks (or when it gets fixed).

*(Note: This test currently fails because the application contains a known bug.
The expected behavior is documented in the assertions.)*

---

## Summary of Automation Value

| Scenario | Type | Business Value | Risk Coverage |
|---------|------|-----------------|---------------|
| Add to Cart + Purchase | Happy Path | High | Critical Checkout Flow |
| Cart Total Calculation | Functional | High | Financial Accuracy |
| Purchase Modal Validation | Negative | High | Data Integrity & Validation |

---

## Technologies Used
- Playwright (TypeScript)
- Page Object Model (POM)
- Chromium (default)
- Node.js 18+
---

## ▶How to Run the Tests

### Setup (First Time)
```bash
npm install
npx playwright install
```

### Run Tests
```bash
npx playwright test
npx playwright test --ui
npx playwright codegen https://www.demoblaze.com/
```

## ▶How to View the Playwright Test Report
After running your tests, a detailed HTML test report can be generated and viewed with:

```bash
npx playwright show-report
```
