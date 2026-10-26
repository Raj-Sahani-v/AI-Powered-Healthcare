import { About } from "../Components/About"
// import { Appointment } from "../Components/Appointment"
import { Blog } from "../Components/Blog"
import { Feature } from "../Components/Feature"
import { Hero } from "../Components/Hero"
import { OurDoctor } from "../Components/OurDoctor"
import { Pricing } from "../Components/Pricing"
import { Searching } from "../Components/Searching"
import { Testimonial } from "../Components/Testimonial"



export const HomePage = () => {
  return (
    <>
        <Hero/>
        <About/>
        <Feature/>
      
        <Pricing/>
        <OurDoctor/>
        <Searching/>
        <Testimonial/>
        <Blog/>
    </>
  )
}
