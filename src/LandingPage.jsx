import { useState } from 'react'
const customStyles = {
  maxWidth: '90vw', // Adjust this value as needed
  margin: '0 auto',
  marginTop: '-200px'
};
const customStyles2 = {
  marginTop: '120px',
  maxWidth: '1900px'
}
// import { Dialog } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

/**const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]
*/
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (

    <div className="bg-white">
    <div>


      <div className="relative isolate px-0 lg:px-0" style={customStyles}>
        <div
          className=" absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            {/*<div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{' '}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
          </div>*/}
          </div>
          <div className="mx-auto max-w-2xl py-1 sm:py-1 lg:py-1 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Time to take your plans out of the group chat
            </h1>
            <br></br>
            <div className='relative isolate px-0 lg:px-0'style={customStyles2}>
            <h2 style={{ maxWidth: '800px',color:'black' }}><b>Introducing Plots, where we turn every 'I don't know, what do you want to do?' into 'I can't believe we just did that!'</b></h2>
            </div><p className="mt-6 text-lg leading-12 text-gray-600 max-w-5xl">
              Transform vague ideas into unforgettable experiences with Plots, 
              the user-friendly web application that simplifies event planning among friends, 
              to maximize participation, and fostering stronger social connections through seamless organization.
            </p>
            <br></br>
            <div style={{ display: 'flex', flex: 1 }}>
            <a href='https://github.com/abccodes/CalHacks2023'><img src='/src/githublogo.png' width='120px' height='120px'/></a>
            <div style={{marginLeft: '340px'}}>
            <a href='https://devpost.com/software/what-s_plots'><img src='/src/devpostlogo.png' width='120px' height='120px'/></a>
            </div>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {/*<a
                href="#"
                //className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"

              >
                Introducing Plots, where we turn every 'I don't know, what do you want to do?' into 'I can't believe we just did that!'
        </a>*/}
              {/*<a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
        </a>*/}
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ed077e] to-[#080e82] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  </div>
  )
}