// Define the testimonial type
export type Testimonial = {
  id: number
  name: string
  position: string
  company?: string
  image: string
  content: string
  rating: number
  date?: string
}

// Function to save a new testimonial to localStorage
export function saveTestimonial(testimonial: Omit<Testimonial, "id">) {
  try {
    // Generate a unique ID
    const id = Date.now()

    // Create the full testimonial object
    const newTestimonial: Testimonial = {
      ...testimonial,
      id,
    }

    // Get existing testimonials from localStorage
    const existingTestimonialsJSON = localStorage.getItem("userTestimonials")
    const existingTestimonials: Testimonial[] = existingTestimonialsJSON ? JSON.parse(existingTestimonialsJSON) : []

    // Add the new testimonial
    const updatedTestimonials = [...existingTestimonials, newTestimonial]

    // Save back to localStorage
    localStorage.setItem("userTestimonials", JSON.stringify(updatedTestimonials))

    return newTestimonial
  } catch (error) {
    console.error("Error saving testimonial to localStorage:", error)
    throw error
  }
}

// Function to get all testimonials from localStorage
export function getStoredTestimonials(): Testimonial[] {
  try {
    const testimonialsJSON = localStorage.getItem("userTestimonials")
    return testimonialsJSON ? JSON.parse(testimonialsJSON) : []
  } catch (error) {
    console.error("Error retrieving testimonials from localStorage:", error)
    return []
  }
}
