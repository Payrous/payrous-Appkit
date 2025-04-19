import Image from 'next/image'
import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MobileNavbar from '@/components/MobileNavbar'
import { Button } from '@/components/ui/button'
import { GoArrowRight } from 'react-icons/go'
import { demo_icon, icon1, icon2, icon3, icon4 } from '@/assets/icons'
import { elipse2, elipse3, eth, faqbg, frame1, frame2, frame3, frame8, frame8b, sponsors, stark } from '@/assets/images'
import PropCard from '@/components/PropCard'
import HowItWorks from '@/components/HowItWorks'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { testimonials } from '@/data/testimonial'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const propCardsData = [
  {
    icon: icon1,
    description: ' Cost-effective solutions reducing gas fees.',
  },
  {
    icon: icon2,
    description: 'Enhanced security through multi-sign capabilities.',
  },
  {
    icon: icon3,
    description: 'Automated Bulk Payments to process multiple payments with a single transaction.',
  },
  {
    icon: icon4,
    description: 'Support scheduled payments, recipient management, and payment edits.',
  },
];

const Payrous = () => {
  return (
    <div className='bg-colors-BlueGray px-8 md:px-32'>
      <Navbar />
      <MobileNavbar />

      <div className='-mx-8 md:-mx-32'>
        {/* hero */}

        <div className='bg-colors-BlueGray flex flex-col items-center justify-center w-full pt-20 md:py-10'>

          <div className='p-6 md:p-16 lg:py-0 lg:px-32 '>
            <div className=' flex flex-col md:flex-row w-full'>
              <h1 className='font-bold text-5xl md:text-6xl lg:text-7xl text-center md:text-left font-source text-white w-full md:w-3/5'>
                Simplify Your Payroll with
                <span className='text-colors-ButtonOrange italic font-geist'> Payrous</span>
              </h1>
              <h1 className='text-sm font-extralight text-center md:text-left leading-6 text-white font-geist md:max-w-[40%] w-full py-6 md:py-0 px-0 lg:px-8'>
                Revolutionize your payroll experience with Payrous, a cutting-edge
                blockchain-powered platform that simplifies bulk payment processes.
                Effortlessly manage and automate payments to multiple recipients
                while leveraging the security of smart contracts—ensuring timely,
                cost-effective transactions in both native cryptocurrency and ERC20
                tokens.
              </h1>

            </div>

            <div className='flex flex-col md:flex-row gap-3 pt-0 md:pt-4 '>
              <Button
                type='submit'
                className='text-white w-full md:w-40 lg:w-44 bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-7 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl'
              >
                Try payrous free
                <GoArrowRight />
              </Button>
              <Button className='border border-orange-400 hover:bg-white hover:border-none bg-colors-BlueGray bg-none w-full md:w-40 lg:w-44 text-colors-ButtonOrange px-5 py-7 rounded-xl'>
                Watch demo
                <Image src={demo_icon} alt='demo' className='w-4 h-4' />
              </Button>
            </div>

          </div>

          <div className='flex flex-col md:flex-row items-center gap-2 md:gap-0 py-8 md:py-3 lg:py-2 px-4 md:px-32'>
            <Image src={frame1} alt='dashboard-picture' className='w-full md:w-[460px] lg:w-[780px] overflow-hidden' />
            <Image src={frame2} alt='cube-frame' className='w-full md:w-[300px] lg:w-[500px] mb-0 lg:-mt-10 overflow-hidden' />
          </div>
        </div>

        {/* social proof */}
        <div className='bg-white py-3 md:py-4 flex flex-col items-center justify-center w-full gap-4 md:gap-6'>
          <h1 className='text-colors-DarkGray font-bold text-xl md:text-3xl'>Trusted by</h1>
          <div className='flex items-center gap-6 lg:gap-10 pb-1 md:pb-2'>
            <Image src={eth} alt='sponsors' className='w-full h-9 md:h-12' />
            <Image src={stark} alt='sponsors' className='w-full h-8 md:h-11' />
          </div>


          {/* offerpage */}
          <div id='features' className='bg-slate-50 flex flex-col justify-center items-center p-6 md:p-16 lg:px-32' >
            <div className='py-12 px-4 md:px-10 bg-orange-100 relative h-full w-full rounded-2xl'>
              <Image
                alt=""
                src={frame3}
                placeholder="blur"
                quality={100}
                fill
                sizes="100vw"
                style={{
                  objectFit: 'cover',
                }}
                className="z-0"
              />
              <div className=''>
                <div className='text-center lg:text-left flex flex-col items-center md:items-start'>
                  <h1 className='relative z-10 font-source font-bold text-colors-BlueGray text-2xl md:text-5xl'>What truly sets us <span className='italic text-colors-ButtonOrange font-geist'>apart</span></h1>
                  <p className='text-sm font-source text-colors-BlueGray py-2'>A solution for efficient, secure, and transparent bulk payment management.</p>
                </div>

                {/* propstyle */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-5 justify-center'>
                  {propCardsData.map((card, index) => (
                    <PropCard key={index} icon={card.icon} description={card.description} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* how it works component */}
        <div id='how-it-works'>
          <HowItWorks />
        </div>

        {/* testimonials */}
        <div className='bg-orange-50 flex flex-col items-center justify-center py-8 md:py-10 '>
          <div className='text-center'>
            <h1 className='relative z-10 font-source font-bold text-colors-BlueGray text-2xl md:text-5xl'>
              What our users think <span className='italic text-colors-ButtonOrange font-geist'>about us </span>
            </h1>
            <p className='text-xs md:text-sm font-source text-colors-BlueGray py-2 font'>
              Learn about what our users say about our services
            </p>
          </div>

          <div className='flex flex-col-reverse lg:flex-row items-center justify-center px-0 gap-10'>
            <Image
              src={frame8}
              alt='globe'
              className='left-0 hidden lg:flex'
            />
            <Image
              src={frame8b}
              alt='globe'
              className='left-0 flex lg:hidden'
            />
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-80 max-w-2xl md:w-full mx-auto overflow-x-hidden"
            >
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="basis md:basis-1/2">
                    <div className="p-1">
                      <Card className={`${testimonial.color} hover:shadow-lg`}>
                        <CardContent className="flex flex-col items-center justify-center px-6 py-14 gap-4 font-source text-left">
                          <p className="text-sm text-left italic text-colors-BlueGray">"{testimonial.quote}"</p>
                          <div className='flex items-left -px-3 gap-3'>
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              width={40}
                              height={40}
                              className="rounded-full"
                            />

                            <div>
                              <h3 className="text-base text-colors-BlueGray font-semibold">{testimonial.name}</h3>
                              <p className="text-sm text-gray-400 text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>

                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex mt-4 space-x-2 justify-center items-center text-colors-BlueGray">
                <CarouselPrevious className="relative left-0 right-0 top-0 translate-y-0 h-8 w-8" />
                <CarouselNext className="relative left-0 right-0 top-0 translate-y-0 h-8 w-8" />
              </div>
            </Carousel>
          </div>
        </div>

        {/* faq */}
        <div id='faq' className='bg-white text-colors-BlueGray py-10 flex flex-col items-center justify-center relative overflow-hidden'>
          <Image
            src={faqbg}
            alt='faq'
            fill
            quality={100}
            className='absolute z-0'
          />
          <div className='text-center'>
            <h1 className='relative z-10 font-source font-bold text-colors-BlueGray text-2xl md:text-5xl'>
              Frequently Asked <span className='italic text-colors-ButtonOrange'>Questions</span>
            </h1>
            <p className='text-xs md:text-sm font-source text-colors-BlueGray py-2 font'>
              Follow these easy steps to make transaction seamless and stress-free
            </p>

          </div>
          <div className='px-4 md:px-0 py-10 w-screen md:max-w-[600px] lg:max-w-[900px] relative overflow-hidden'>
            <div className='bg-orange-100 rounded-2xl'>
              <Accordion type="single" collapsible className='px-10 py-10'>
                <AccordionItem value="item-1">
                  <AccordionTrigger className='py-5 text-black hover:text-colors-BlueGray'>What is the Payrous App?</AccordionTrigger>
                  <AccordionContent>
                    Setting up your account typically involves visiting the payment platform’s website and connecting your crypto wallet. You’ll need to create an organization to facilitate transactions to recipients.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className='py-5 hover:text-colors-BlueGray'>How do I set up my account?</AccordionTrigger>
                  <AccordionContent>
                    Setting up your account typically involves visiting the payment platform’s website and connecting your crypto wallet. You’ll need to create an organization to facilitate transactions to recipients.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className='py-5 hover:text-colors-BlueGray'>What cryptocurrencies does Payrous support?</AccordionTrigger>
                  <AccordionContent>
                    Setting up your account typically involves visiting the payment platform’s website and connecting your crypto wallet. You’ll need to create an organization to facilitate transactions to recipients.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className='py-5 hover:text-colors-BlueGray'>How do i get started using the Pay4Me App?</AccordionTrigger>
                  <AccordionContent>
                    Setting up your account typically involves visiting the payment platform’s website and connecting your crypto wallet. You’ll need to create an organization to facilitate transactions to recipients.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </div>
          </div>
        </div>

        {/* transaction */}
        <div className='bg-slate-50 flex flex-col justify-center items-center p-4 md:p-16 lg:p-32'>
          <div className='bg-colors-BlueGray rounded-3xl py-16 px-8 md:py-16 md:px-48 flex flex-col relative items-center md:w-full'>

            <Image
              alt=""
              src={elipse2}
              fill
              quality={100}
              style={{
                width: '',
              }}
              className="z-0 absolute "
            />

            <Image
              alt=""
              src={elipse3}
              quality={100}
              className="z-0 absolute top-0 right-0 w-40 h-40  md:w-80 md:h-80"
            />
            <div className='flex flex-col text-center justify-center items-center'>
              <h1 className='relative z-10 font-source font-bold text-white text-2xl md:text-5xl'>
                Start your <span className='italic text-colors-ButtonOrange font-geist'>first transaction</span> today!
              </h1>
              <p className='text-sm font-source text-white py-5 w-full md:w-[600px]'>
                Join thousands of satisfied users who aim to revolutionize how organizations handle payments, ensuring efficiency, cost savings, and security.
              </p>
            </div>
            <Button
              type='submit'
              className='text-white w-full md:w-40 lg:w-44 bg-colors-ButtonOrange hover:bg-orange-300 shadow-slate-200 px-5 py-7 shadow-[inset_-4px_-4px_10px_0px_rgba(0,0,0,0.4)] rounded-xl'
            >
              Try payrous free
              <GoArrowRight />
            </Button>
          </div>
        </div>

        {/* footer */}
        <Footer />
      </div>


    </div>
  )
}

export default Payrous