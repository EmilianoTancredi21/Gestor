const IncomeSchema = require("../models/IncomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = IncomeSchema({
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
    await income.save();
    res.status(200).json({ message: "Se ha agregado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }

  console.log(income);
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  //   console.log(params);
  IncomeSchema.findByIdAndDelete(id)
    .then((income) => {
      res.status(200).json({ message: "Gasto eliminado correctamente" });
    })
    .catch((error) => {
      res.status(500).json({ message: "Error del servidor" });
    });
};
