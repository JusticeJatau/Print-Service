export const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15T10:30:00",
    status: "ready",
    items: [
      {
        fileName: "lecture_notes.pdf",
        pages: 25,
        copies: 1,
        printType: "blackAndWhite",
        price: 125
      }
    ],
    total: 125,
    pickupLocation: "Main Campus Café"
  },
  {
    id: "ORD-002",
    date: "2024-01-14T15:45:00",
    status: "printing",
    items: [
      {
        fileName: "assignment.docx",
        pages: 10,
        copies: 2,
        printType: "color",
        price: 400
      }
    ],
    total: 400,
    pickupLocation: "Main Campus Café"
  },
  {
    id: "ORD-003",
    date: "2024-01-13T09:15:00",
    status: "pending",
    items: [
      {
        fileName: "presentation.pdf",
        pages: 15,
        copies: 1,
        printType: "color",
        price: 300
      }
    ],
    total: 300,
    pickupLocation: "Main Campus Café"
  }
]

export const orderStatuses = {
  pending: { label: "Pending", color: "yellow", bg: "bg-yellow-100", text: "text-yellow-800" },
  printing: { label: "Printing", color: "blue", bg: "bg-blue-100", text: "text-blue-800" },
  ready: { label: "Ready for Pickup", color: "green", bg: "bg-green-100", text: "text-green-800" }
}