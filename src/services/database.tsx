import SQLite from 'react-native-sqlite-storage';
import {User} from '../models/User';
import {Attempt} from '../models/Attempt';
import {Question} from '../models/Question';
import {Alert} from 'react-native';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = 'Quizella.db';
const database_version = '1.0';
const database_displayname = 'SQLite Quiz Database';
const database_size = 200000;

export default class DatabaseService {
  db: SQLite.SQLiteDatabase | null = null;

  async initDatabase() {
    try {
      this.db = await SQLite.openDatabase({
        name: database_name,
        location: 'default',
      });

      console.log('Database opened');
      await this.createTables();
    } catch (error) {
      console.error('Error opening database: ', error);
    }
  }

  async createTables() {
    if (!this.db) return;
    const createUsersTableQuery = `CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            phone_number TEXT,
            profile_picture_path TEXT,
            role TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`;

    const createQuestionsTableQuery = `CREATE TABLE IF NOT EXISTS Questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            question TEXT NOT NULL,
            option1 TEXT NOT NULL,
            option2 TEXT NOT NULL,
            option3 TEXT NOT NULL,
            option4 TEXT NOT NULL,
            correct_option INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );`;

    const createQuizAttemptsTableQuery = `CREATE TABLE IF NOT EXISTS QuizAttempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            question_id INTEGER NOT NULL,
            chosen_option INTEGER,
            is_correct BOOLEAN,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES Users (id),
            FOREIGN KEY (question_id) REFERENCES Questions (id)
        );`;

    await this.db.executeSql(createUsersTableQuery);
    await this.db.executeSql(createQuestionsTableQuery);
    await this.db.executeSql(createQuizAttemptsTableQuery);

    const admin = await this.getUserByUsername('admin');
    if (!admin) {
      const query = `INSERT INTO Users (username, password, phone_number, profile_picture_path,role) VALUES (?, ?, ?, ?,?)`;
      await this.db.executeSql(query, [
        'admin',
        'admin',
        7894561230,
        '../../../assets/default-profile.png',
        'admin',
      ]);
    } else {
      console.log('ADMIN already exist');
    }

    console.log('Tables created');
  }

  // CRUD operations for Users
  async createUser(user: User): Promise<void> {
    if (!this.db) return;
    const existingUser = await this.getUserByUsername(user.username);
    if (existingUser) {
      Alert.alert('User Already Exist. Please try another username');
    } else {
      const query = `INSERT INTO Users (username, password, phone_number, profile_picture_path,role) VALUES (?, ?, ?, ?,?)`;
      await this.db.executeSql(query, [
        user.username,
        user.password,
        user.phoneNumber,
        user.imageUrl,
        'user',
      ]);
    }
  }

  async getUserById(id: number): Promise<User | null> {
    if (!this.db) return null;
    const [results] = await this.db.executeSql(
      `SELECT * FROM Users WHERE id = ?`,
      [id],
    );
    if (results.rows.length > 0) {
      const row = results.rows.item(0);
      return {
        id: row.id,
        username: row.username,
        password: row.password,
        phoneNumber: row.phone_number,
        imageUrl: row.profile_picture_path,
        role: row.role, // assuming all fetched users have 'user' role for now
      };
    }
    return null;
  }

  async getUserByUsername(username: string): Promise<User | null> {
    if (!this.db) return null;
    const [results] = await this.db.executeSql(
      `SELECT * FROM Users WHERE username = ?`,
      [username],
    );
    if (results.rows.length > 0) {
      const row = results.rows.item(0);
      return {
        id: row.id,
        username: row.username,
        password: row.password,
        phoneNumber: row.phone_number,
        imageUrl: row.profile_picture_path,
        role: row.role, // assuming all fetched users have 'user' role for now
      };
    }
    return null;
  }

  async updateUser(user: User): Promise<void> {
    if (!this.db || !user.id) return;
    console.log('___________________UPDATE USER SERVICE___________________');
    console.log('User Id : ' + user.id);
    console.log('Username : ' + user.username);
    console.log('User Phone Number : ' + user.phoneNumber);
    console.log('User Password : ' + user.password);
    console.log('User Role : ' + user.role);
    const query = `UPDATE Users SET username = ?, password = ?, phone_number = ?, profile_picture_path = ? WHERE id = ?`;
    await this.db.executeSql(query, [
      user.username,
      user.password,
      user.phoneNumber,
      user.imageUrl,
      user.id,
    ]);
  }

  async deleteUser(id: number): Promise<void> {
    if (!this.db) return;
    const query = `DELETE FROM Users WHERE id = ?`;
    await this.db.executeSql(query, [id]);
  }

  async getAllUsers(): Promise<User[]> {
    if (!this.db) return [];
    const [results] = await this.db.executeSql(
      `SELECT * FROM Users WHERE role = ?`,
      ['user'],
    );
    const users: User[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      users.push({
        id: row.id,
        username: row.username,
        password: row.password,
        phoneNumber: row.phone_number,
        imageUrl: row.profile_picture_path,
        role: row.role, // assuming all fetched users have 'user' role for now
      });
    }

    console.log('GET ALL USERS - WORKED');
    return users;
  }

  // CRUD operations for Questions
  async createQuestion(question: Question): Promise<void> {
    if (!this.db) return;
    const query = `INSERT INTO Questions (question, option1, option2, option3, option4, correct_option) VALUES (?, ?, ?, ?, ?, ?)`;
    await this.db.executeSql(query, [
      question.question,
      question.option1,
      question.option2,
      question.option3,
      question.option4,
      question.correct_option,
    ]);
  }

  async getQuestionById(id: number): Promise<Question | null> {
    if (!this.db) return null;
    const [results] = await this.db.executeSql(
      `SELECT * FROM Questions WHERE id = ?`,
      [id],
    );
    if (results.rows.length > 0) {
      const row = results.rows.item(0);
      return {
        questionId: row.id,
        question: row.question,
        option1: row.option1,
        option2: row.option2,
        option3: row.option3,
        option4: row.option4,
        correct_option: row.correct_option,
      };
    }
    return null;
  }

  async updateQuestion(question: Question): Promise<void> {
    if (!this.db || !question.questionId) return;
    const query = `UPDATE Questions SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, correct_option = ? WHERE id = ?`;
    await this.db.executeSql(query, [
      question.question,
      question.option1,
      question.option2,
      question.option3,
      question.option4,
      question.correct_option,
      question.questionId,
    ]);
  }

  async deleteQuestion(id: number): Promise<void> {
    if (!this.db) return;
    const query = `DELETE FROM Questions WHERE id = ?`;
    await this.db.executeSql(query, [id]);
  }

  async getAllQuestions(): Promise<Question[]> {
    if (!this.db) return [];
    const [results] = await this.db.executeSql(`SELECT * FROM Questions`);
    const questions: Question[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      questions.push({
        questionId: row.id,
        question: row.question,
        option1: row.option1,
        option2: row.option2,
        option3: row.option3,
        option4: row.option4,
        correct_option: row.correct_option,
      });
    }
    return questions;
  }

  // CRUD operations for Attempts
  async createAttempt(attempt: Attempt): Promise<void> {
    if (!this.db) return;
    const query = `INSERT INTO QuizAttempts (user_id, question_id, chosen_option, is_correct) VALUES (?, ?, ?, ?)`;
    await this.db.executeSql(query, [
      attempt.user_id,
      attempt.question_id,
      attempt.chosen_option,
      attempt.is_correct,
    ]);
  }

  async getAttemptById(id: number): Promise<Attempt | null> {
    if (!this.db) return null;
    const [results] = await this.db.executeSql(
      `SELECT * FROM QuizAttempts WHERE id = ?`,
      [id],
    );
    if (results.rows.length > 0) {
      const row = results.rows.item(0);
      return {
        attemp_id: row.id,
        user_id: row.user_id,
        question_id: row.question_id,
        chosen_option: row.chosen_option,
        is_correct: row.is_correct,
      };
    }
    return null;
  }

  async updateAttempt(attempt: Attempt): Promise<void> {
    if (!this.db || !attempt.attemp_id) return;
    const query = `UPDATE QuizAttempts SET user_id = ?, question_id = ?, chosen_option = ?, is_correct = ? WHERE id = ?`;
    await this.db.executeSql(query, [
      attempt.user_id,
      attempt.question_id,
      attempt.chosen_option,
      attempt.is_correct,
      attempt.attemp_id,
    ]);
  }

  async deleteAttempt(id: number): Promise<void> {
    if (!this.db) return;
    const query = `DELETE FROM QuizAttempts WHERE id = ?`;
    await this.db.executeSql(query, [id]);
  }

  async getAllAttempts(): Promise<Attempt[]> {
    if (!this.db) return [];
    const [results] = await this.db.executeSql(`SELECT * FROM QuizAttempts`);
    const attempts: Attempt[] = [];
    for (let i = 0; i < results.rows.length; i++) {
      const row = results.rows.item(i);
      attempts.push({
        attemp_id: row.id,
        user_id: row.user_id,
        question_id: row.question_id,
        chosen_option: row.chosen_option,
        is_correct: row.is_correct,
      });
    }
    return attempts;
  }

  // Retrieve questions based on user_id
  getQuestionsByUserId(
    userId: number,
  ): Promise<
    (Question & {
      chosen_option: number;
      is_correct: boolean;
      attempt_created_at: string;
    })[]
  > {
    if (!this.db) {
      return Promise.reject('Database not initialized');
    }

    return this.db
      .executeSql(
        `SELECT 
         q.*, 
         qa.chosen_option, 
         qa.is_correct, 
         qa.created_at as attempt_created_at 
       FROM Questions q
       INNER JOIN QuizAttempts qa ON q.id = qa.question_id
       WHERE qa.user_id = ?;`,
        [userId],
      )
      .then(([results]) => {
        const questions: (Question & {
          chosen_option: number;
          is_correct: boolean;
          attempt_created_at: string;
        })[] = [];
        for (let i = 0; i < results.rows.length; i++) {
          questions.push(results.rows.item(i));
        }
        return questions;
      });
  }
}

// Initialize the database
const databaseService = new DatabaseService();

export {databaseService};
