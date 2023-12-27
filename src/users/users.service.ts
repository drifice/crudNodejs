/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }
  /**
   * Cette fonction est utilisée pour créer un utilisateur dans une entité utilisateur.
   * @param createUserDto ce sera le type de createUserDto dans lequel
   * nous avons défini quelles sont les clés que nous attendons du corps
   * @returns promesse de l'utilisateur
   */
  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = createUserDto.password;
    return this.userRepository.save(user);
  }
  /**
   * la fonction permet de trouver tous les utilisateurs
   * @returns une promesse des l'utilisateurs recherchés
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  /**
   * la fonction permet de trouver un utilisateur avec son id
   * @param id de type number pour identifier l'utilisateur
   * @returns une promesse de l'utilisateur recherché
   */
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
  /**
  * cette fonction est utilisée pour mettre à jour un utilisateur spécifique dont l'identifiant est transmis
  * @param id de type number pour identifier l'utilisateur
  * @param updateUserDto le type comme createUserDto.
  * @returns une promese de la maj de l'utilisateur
  */
  update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.user_id = id;
    return this.userRepository.save(user);
  }
  /**
   * La fonction est utilisé pour pour supprimer le user dans la bdd
   * @param id de type number pour identifier l'utilisateur
   * @returns le nombre de ligne suprimé
   */
  remove(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
