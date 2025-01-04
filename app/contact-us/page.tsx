import ContactForm from './../components/ContactForm';

export default function ContactUsPage() {
  return (
    <section className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="container mx-auto p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12">
        {/* Left Section: Company Details */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            Got questions or need assistance? We&#39;re here to help! Fill out the form or reach us through the following:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Phone:</h4>
              <p className="text-gray-600">+1 (123) 456-7890</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Email:</h4>
              <p className="text-gray-600">support@cottonhub.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Address:</h4>
              <p className="text-gray-600">37, Veera St, VOC Saalai, Erode - 638001</p>
            </div>
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}