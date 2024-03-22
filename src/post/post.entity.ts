import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: 'https://placehold.co/600x400/0057ff/FFFFFF.png' })
  image: string;

  @Column()
  category: string;

  @Column()
  shortDescription: string;

  @Column()
  longDescription: string;

  @Column()
  createdBy: string;

  @Column()
  author: string;

  @Column()
  authorImage: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
