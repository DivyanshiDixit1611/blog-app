import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query, Permission, Role } from "appwrite";

export class AppwriteService {
  client;
  databases;
  bucket;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ======================
  // DATABASE SERVICES
  // ======================

  async createPost({
    title,
    slug,
    content,
    featuredImage,
    status = "active",
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Create Post Error:", error.message);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.error("Update Post Error:", error.message);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Delete Post Error:", error.message);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Get Post Error:", error.message);
      return null;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Get Posts Error:", error.message);
      return null;
    }
  }

  // ======================
  // STORAGE SERVICES
  // ======================

 
async uploadFile(file) {
  try {
    return await this.bucket.createFile(
      conf.appwriteBucketId,
      ID.unique(),
      file
    );
  } catch (error) {
    console.error("Upload File Error:", error.message);
    return null;
  }
}



  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
      return true;
    } catch (error) {
      console.error("Delete File Error:", error.message);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFileView(
      conf.appwriteBucketId,
      fileId
    );
  }
}

const appwriteService = new AppwriteService();
export default appwriteService;
