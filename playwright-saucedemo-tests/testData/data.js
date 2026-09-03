export const data = [
  {
    caseTitle: "Should reject an incorrect password",
    caseName: "Incorrect password",
    login: "standard_user",
    password: "wrong_password",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    caseTitle: "Should reject an incorrect username",
    caseName: "Incrocect username",
    login: "invalid_user",
    password: "secret_sauce",
    expectedError:
      "Epic sadface: Username and password do not match any user in this service",
  },
  {
    caseTitle: "should display an error for empty credentials",
    caseName: "Empty credentials",
    login: "",
    password: "",
    expectedError: "Epic sadface: Username is required",
  },
];

export const sortedProductsBy = [
  {
    sortName: "Price (low to high)",
    sortFunction: (a, b) => a - b,
  },
  {
    sortName: "Price (high to low)",
    sortFunction: (a, b) => b - a,
  },
];
export const customer = {
  name: "John",
  surname: "Kowalsky",
  postalCode: "12345",
};

export const invalidCustomer = {
  ...customer,
  postalCode: "",
};
