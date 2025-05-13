// src/app/pricing/page.tsx
export default function Pricing() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Pricing Plans</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {['Free', 'Pro', 'Elite'].map((plan, i) => (
          <div key={i} className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">{plan}</h3>
            <p className="text-gray-600 mb-4">
              {plan === 'Free' ? 'Basic predictions' :
               plan === 'Pro' ? 'Advanced analytics' : 'Full access with AI predictions'}
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Choose {plan}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
