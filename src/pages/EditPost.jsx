import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, PostForm } from '../components/index';
import appwriteService from '../appwrite/config';

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate('/'); // redirect if post not found
        }
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  if (!post) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-lg font-semibold">Loading post...</h2>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}

export default EditPost;
