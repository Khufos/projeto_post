import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function getPosts() {
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();

            if (res.ok) {
                setPosts(data);
            } else {
                throw new Error("Failed to fetch posts");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { getPosts() }, []);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    return (
        <>
            <h1 className="title">Post</h1>
            {posts.length > 0 ? posts.map(post => (
                <div key={post.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h2 className="font-bold text-2xl">{post.title}</h2>
                            <small className="text-xs text-slate-600">
                                Created by {post.user.name} on{" "}
                                {new Date(post.created_at).toLocaleTimeString()}
                            </small>
                        </div>

                        <Link to={`/post/${post.id}`} className="bg-blue-500 text-white text-sm rounded-lg py-1 px-3">
                            Read more
                        </Link>
                    </div>

                    <p className="break-words">{post.body}</p>
                </div>
            )) : <p>Não há postagens disponíveis</p>}
        </>
    );
}
