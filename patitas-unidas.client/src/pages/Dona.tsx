"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import "/src/styles/Dona.css"
import Maintenance from "../components/Maintenance"

export default function Dona() {
  return (
    <div className="page-container">
      <Header />
      <main>
        <Maintenance />
      </main>
      <Footer />
    </div>
  )
}
