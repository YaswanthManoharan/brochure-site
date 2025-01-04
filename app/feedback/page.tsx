import FeedbackForm from './../components/FeedbackForm';

export default function FeedbackPage() {
  return (
    <section className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="container mx-auto p-8 flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12">
        {/* Left Section: Feedback Details */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Share Your Feedback</h2>
          <p className="text-gray-600 mb-6">
            Your opinions and suggestions mean a lot to us! Let us know what you think about our products and services, 
            and help us improve for you.
          </p>
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold text-gray-800">Why Feedback Matters:</h4>
              <p className="text-gray-600">
                Your feedback helps us enhance our products and deliver better services.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-800">What We Value:</h4>
              <p className="text-gray-600">
                Honest opinions, constructive suggestions, and innovative ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Feedback Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}