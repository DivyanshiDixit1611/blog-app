import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    try {
      setIsSubmitting(true);

      const userId = userData.$id;

      if (post) {
        let fileId = post.featuredImage;

        if (data.image?.[0]) {
          const file = await appwriteService.uploadFile(data.image[0]);
          if (file) {
            if (post.featuredImage) {
              await appwriteService.deleteFile(post.featuredImage);
            }
            fileId = file.$id;
          }
        }

        const dbPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: data.content,
          status: data.status,
          featuredImage: fileId,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);

      } else {
        if (!data.image?.[0]) {
          alert("Image is required");
          setIsSubmitting(false);
          return;
        }

        const file = await appwriteService.uploadFile(data.image[0]);
        if (!file) {
          alert("Image upload failed");
          setIsSubmitting(false);
          return;
        }

        const dbPost = await appwriteService.createPost({
          title: data.title,
          slug: data.slug,
          content: data.content,
          featuredImage: file.$id,
          status: data.status,
          userId,
        });

        if (dbPost) navigate(`/post/${dbPost.$id}`);
      }

    } catch (err) {
      console.error("Post submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slugTransform = useCallback((value) =>
    value
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  , []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap gap-4">
      <div className="w-full md:w-2/3">
        <Input label="Title" {...register("title", { required: true })} />
        <Input label="Slug" {...register("slug", { required: true })} />
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-full md:w-1/3">
        <Input
          label="Featured Image"
          type="file"
          accept="image/*"
          {...register("image", { required: !post })}
        />

        <Select
          label="Status"
          options={["active", "inactive"]}
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full mt-4 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting
            ? "Submitting..."
            : post
            ? "Update Post"
            : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
