import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import StockManagement from './Pages/StockManagement'
import { BuyerModule, DailyExpenses, DueManagement, ExpenseManagement, InvoiceManagement, Login } from './Pages'

function App() {

  return (
    <>
      <div className='h-[100vh] w-full'>
        <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route path='/login' element={<Login />} /> */}
          <Route path='/stock-management' element={<StockManagement />} />
          <Route path='/due-management' element={<DueManagement />} />
          <Route path='/expense-management' element={<ExpenseManagement />} />
          <Route path='/daily-expenses' element={<DailyExpenses />} />
          <Route path='/invoice-management' element={<InvoiceManagement />} />
          <Route path='/buyer-module' element={<BuyerModule />} />
        </Routes>
      </div>
    </>
  )
}

export default App
