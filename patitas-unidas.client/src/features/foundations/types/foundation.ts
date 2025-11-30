export interface Foundation {
    id: number
    name: string
    logo: string
    city: string
    description: string
    email: string
    phone: string
    contact: Contact[]
  }

  export interface Contact {
    socialMedia: string
    url: string
  }
