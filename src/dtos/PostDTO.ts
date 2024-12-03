import { CategoryDTO } from "./CategoryDTO";
import { UserDTO } from "./UserDTO";

export type PostDTO = {
  id: number;
  content: string;
  title: string;
  slug: string;
  imageUrl: string;
  categories: CategoryDTO[];
  authorId: number;
  teacher: UserDTO;

  createdAt: string;
  updatedAt: string;
};
