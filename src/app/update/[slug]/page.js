import UpdateInput from "@/app/compoenents/Header/UpdateInput";

function UpdatePage({ params }) {
  const { slug } = params; // Get the slug from the URL

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Update Blog</h1>
      <UpdateInput slug={slug} />{" "}
      {/* Pass the slug to the UpdateInput component */}
    </div>
  );
}

export default UpdatePage;
