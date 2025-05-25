export default function NewsFeed() {
  const news = [
    { title: "X launches new crypto platform", text: "X is entering the DeFi space with a groundbreaking platform for asset trading." },
    { title: "Elon Musk on AI", text: "Elon Musk warns about unchecked AI development during a press event." },
    { title: "X Stock Soars", text: "After latest earnings report, X stock has jumped 10% in pre-market trading." }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">News from X</h2>
      {news.map((item, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-bold text-gray-700">{item.title}</h3>
          <p className="text-gray-600">{item.text}</p>
        </div>
      ))}
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Go to X
      </button>
    </div>
  );
}
