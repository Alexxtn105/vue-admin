// Класс пользователя. Нужен для операций обновления и удаления
import {Role} from "@/models/Role";

export class User {
    constructor(
      public  id: number,
      public  first_name: string,
      public  last_name: string,
      public  email: string,
      public role: Role,
    ) {
    }
}