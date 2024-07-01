import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  const handleError = (err) => {
    setError(err.response?.data?.message || "Se ha producido un error");
  };

  const fetchIncomes = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(data);
    } catch (err) {
      handleError(err);
    }
  }, []);

  const fetchExpenses = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(data);
    } catch (err) {
      handleError(err);
    }
  }, []);

  const addIncome = useCallback(
    async (income) => {
      try {
        await axios.post(`${BASE_URL}add-income`, income);
        fetchIncomes();
      } catch (err) {
        handleError(err);
      }
    },
    [fetchIncomes]
  );

  const deleteIncome = useCallback(
    async (id) => {
      try {
        await axios.delete(`${BASE_URL}delete-income/${id}`);
        fetchIncomes();
      } catch (err) {
        handleError(err);
      }
    },
    [fetchIncomes]
  );

  const addExpense = useCallback(
    async (expense) => {
      try {
        await axios.post(`${BASE_URL}add-expense`, expense);
        fetchExpenses();
      } catch (err) {
        handleError(err);
      }
    },
    [fetchExpenses]
  );

  const deleteExpense = useCallback(
    async (id) => {
      try {
        await axios.delete(`${BASE_URL}delete-expense/${id}`);
        fetchExpenses();
      } catch (err) {
        handleError(err);
      }
    },
    [fetchExpenses]
  );

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + item.amount, 0);

  const totalIncome = useCallback(() => calculateTotal(incomes), [incomes]);
  const totalExpenses = useCallback(() => calculateTotal(expenses), [expenses]);

  const totalBalance = useCallback(
    () => totalIncome() - totalExpenses(),
    [totalIncome, totalExpenses]
  );

  const transactionHistory = useCallback(() => {
    const history = [...incomes, ...expenses].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    return history.slice(0, 3);
  }, [incomes, expenses]);

  return (
    <GlobalContext.Provider
      value={{
        addIncome,
        fetchIncomes,
        incomes,
        deleteIncome,
        expenses,
        addExpense,
        fetchExpenses,
        deleteExpense,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
