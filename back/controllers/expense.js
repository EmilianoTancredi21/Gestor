const ExpenseSchema = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    category,
    description,
    date,
  });

  try {
    //validations
    if (!title || !category || !description || !date) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }
    if (amount <= 0 || !amount === "number") {
      return res.status(400).json({ message: "El monto debe ser mayor que 0" });
    }
    await expense.save();
    res.status(200).json({ message: "Se ha agregado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }

  console.log(expense);
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  //   console.log(params);
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(200).json({ message: "Ingreso eliminada correctamente" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error del servidor" });
    });
};
