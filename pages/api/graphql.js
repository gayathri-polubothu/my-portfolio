import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import dbConnect from '../../lib/dbConnect';
import Project from '../../models/Project';
import Contact from '../../models/Contact';

// GraphQL Schema
const typeDefs = gql`
  type Project {
    id: ID!
    title: String!
    description: String!
    image: String!
    tech: [String!]!
    demoUrl: String
    githubUrl: String
    featured: Boolean!
    order: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Contact {
    id: ID!
    name: String!
    email: String!
    message: String!
    status: String!
    createdAt: String!
  }

  type Query {
    projects: [Project!]!
    project(id: ID!): Project
    featuredProjects: [Project!]!
    contacts: [Contact!]!
  }

  type Mutation {
    createProject(
      title: String!
      description: String!
      image: String!
      tech: [String!]!
      demoUrl: String
      githubUrl: String
      featured: Boolean
      order: Int
    ): Project!

    updateProject(
      id: ID!
      title: String
      description: String
      image: String
      tech: [String!]
      demoUrl: String
      githubUrl: String
      featured: Boolean
      order: Int
    ): Project!

    deleteProject(id: ID!): Boolean!

    createContact(
      name: String!
      email: String!
      message: String!
    ): Contact!
  }
`;

// GraphQL Resolvers
const resolvers = {
  Query: {
    projects: async () => {
      await dbConnect();
      const projects = await Project.find({}).sort({ order: 1, createdAt: -1 });
      return projects.map((project) => ({
        ...project.toObject(),
        id: project._id.toString(),
      }));
    },

    project: async (_, { id }) => {
      await dbConnect();
      const project = await Project.findById(id);
      if (!project) throw new Error('Project not found');
      return {
        ...project.toObject(),
        id: project._id.toString(),
      };
    },

    featuredProjects: async () => {
      await dbConnect();
      const projects = await Project.find({ featured: true }).sort({ order: 1 });
      return projects.map((project) => ({
        ...project.toObject(),
        id: project._id.toString(),
      }));
    },

    contacts: async () => {
      await dbConnect();
      const contacts = await Contact.find({}).sort({ createdAt: -1 });
      return contacts.map((contact) => ({
        ...contact.toObject(),
        id: contact._id.toString(),
      }));
    },
  },

  Mutation: {
    createProject: async (_, args) => {
      await dbConnect();
      const project = await Project.create(args);
      return {
        ...project.toObject(),
        id: project._id.toString(),
      };
    },

    updateProject: async (_, { id, ...updates }) => {
      await dbConnect();
      const project = await Project.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
      if (!project) throw new Error('Project not found');
      return {
        ...project.toObject(),
        id: project._id.toString(),
      };
    },

    deleteProject: async (_, { id }) => {
      await dbConnect();
      const result = await Project.deleteOne({ _id: id });
      return result.deletedCount > 0;
    },

    createContact: async (_, args) => {
      await dbConnect();
      const contact = await Contact.create(args);
      return {
        ...contact.toObject(),
        id: contact._id.toString(),
      };
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Export the handler
export default startServerAndCreateNextHandler(server);

