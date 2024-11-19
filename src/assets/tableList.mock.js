export const allTables = {
  tables: [
    {
      id: "employee_table",
      name: "Employee",
      columns: [
        {
          column_id: "age_id",
          name: "age",
          column_data_type: "Integer",
        },
        {
          column_id: "emp_id",
          name: "Employee Id",
          column_data_type: "Integer",
        },
        {
          column_id: "exp_id",
          name: "Experience",
          column_data_type: "Integer",
        },
      ],
    },
    {
      id: "employeeDetails_table",
      name: "Employee Details",
      columns: [
        {
          column_id: "dob_id",
          name: "Date Of Birth",
          column_data_type: "date",
        },
        {
          column_id: "fn_id",
          name: "First Name",
          column_data_type: "string",
        },
        {
          column_id: "ln_id",
          name: "Last Name",
          column_data_type: "string",
        },
      ],
    },
    {
      id: "employeeDetails2_table",
      name: "Department Details2",
      columns: [
        {
          column_id: "dept_id",
          name: "Department",
          column_data_type: "String",
        },
        {
          column_id: "loc_id",
          name: "Location",
          column_data_type: "String",
        },
        {
          column_id: "pin_id",
          name: "Pin Code",
          column_data_type: "String",
        },
      ],
    },
    {
      id: "employeeDetails3_table",
      name: "Inventory Details2",
      columns: [
        {
          column_id: "comp_id",
          name: "Computers",
          column_data_type: "Number",
        },
        {
          column_id: "Laptops_id",
          name: "Laptops",
          column_data_type: "Number",
        },
        {
          column_id: "keyboard_id",
          name: "Keyboard",
          column_data_type: "Number",
        },
        {
          column_id: "phone_id",
          name: "Phones",
          column_data_type: "String",
        },
      ],
    },
    {
      id: "employeeDetails4_table",
      name: "Customer Details2",
      columns: [
        {
          column_id: "cust_id",
          name: "Customer",
          column_data_type: "String",
        },
        {
          column_id: "cust_loc_id",
          name: "Location",
          column_data_type: "String",
        },
        {
          column_id: "cust_pin_id",
          name: "Pin Code",
          column_data_type: "String",
        },
      ],
    },
  ],
};
