import { Schema } from "@/entities/table";

export const sampleSchema: Schema = {
  tables: [
    {
      id: "users",
      name: "users",
      position: { x: 100, y: 100 },
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "email", type: "VARCHAR(255)", isNotNull: true },
        { name: "name", type: "VARCHAR(100)", isNotNull: true },
        { name: "created_at", type: "TIMESTAMP", isNotNull: true },
        { name: "updated_at", type: "TIMESTAMP" },
      ],
    },
    {
      id: "posts",
      name: "posts",
      position: { x: 500, y: 100 },
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "user_id", type: "INT", isForeignKey: true, isNotNull: true },
        { name: "title", type: "VARCHAR(255)", isNotNull: true },
        { name: "content", type: "TEXT" },
        { name: "created_at", type: "TIMESTAMP", isNotNull: true },
      ],
    },
    {
      id: "comments",
      name: "comments",
      position: { x: 300, y: 400 },
      columns: [
        { name: "id", type: "INT", isPrimaryKey: true, isNotNull: true },
        { name: "post_id", type: "INT", isForeignKey: true, isNotNull: true },
        { name: "user_id", type: "INT", isForeignKey: true, isNotNull: true },
        { name: "content", type: "TEXT", isNotNull: true },
        { name: "created_at", type: "TIMESTAMP", isNotNull: true },
      ],
    },
  ],
  relationships: [
    {
      id: "users-posts",
      sourceTableId: "users",
      targetTableId: "posts",
      sourceColumn: "id",
      targetColumn: "user_id",
      type: "one-to-many",
    },
    {
      id: "posts-comments",
      sourceTableId: "posts",
      targetTableId: "comments",
      sourceColumn: "id",
      targetColumn: "post_id",
      type: "one-to-many",
    },
    {
      id: "users-comments",
      sourceTableId: "users",
      targetTableId: "comments",
      sourceColumn: "id",
      targetColumn: "user_id",
      type: "one-to-many",
    },
  ],
};
