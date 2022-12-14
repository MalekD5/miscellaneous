import {
  useGetPostsQuery,
  useDeletePostMutation,
} from './redux/services/pichillCore';

function App() {
  const { data: posts, isFetching, error, refetch } = useGetPostsQuery();
  const [deleteUser, _] = useDeletePostMutation();

  if (isFetching) return <div>Fetching....</div>;
  if (error) console.log(posts);

  console.log(posts);

  return (
    <div>
      {posts!.map((post) => (
        <h1 key={post._id} className="text-white text-3xl text-center">
          {post.title}
          <button
            onClick={() =>
              deleteUser({ _id: post._id }).then(() => {
                refetch();
              })
            }
          >
            delete
          </button>
        </h1>
      ))}
    </div>
  );
}

export default App;
