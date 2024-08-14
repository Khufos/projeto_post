import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { user, token } = useContext(AppContext);
    const navigate = useNavigate();

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        console.log(data.post);

        if (res.ok) {
            setPost(data.post);
        }
    }

    async function handleDelete() {
        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                navigate("/");
            }
        }
    }

    useEffect(() => { getPost(); }, [id, token]);

    return (
        <>
            <h1 className="title">Descrição</h1>
            {post ? (
                <div
                    key={post.id}
                    className="mb-4 p-4 border rounded-md border-dashed border-slate-400"
                >
                    <h2 className="font-bold text-2xl">{post.title}</h2>
                    <small className="text-xs text-slate-600">
                        Created by {post.user?.name || "Unknown"} on{" "}
                        {new Date(post.created_at).toLocaleTimeString()}
                    </small>
                    <div className="break-words">{post.body}</div>
                    {user && post.user_id === user.id && (
                        <div className="flex items-center justify-end gap-4">
                            <Link
                                to={`/posts/update/${post.id}`}
                                className="bg-green-500 text-white text-sm rounded-md px-3 py-1"
                            >
                                Update
                            </Link>

                            <button
                                onClick={handleDelete}
                                className="bg-blue-500 text-white text-sm rounded-md px-3 py-1"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Post não existe</p>
            )}
        </>
    );
}
