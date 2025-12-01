"use client"

//import { useState } from "react"
import { Header, Footer } from "@/components"
import "../styles/Dona.css"
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
