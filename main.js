"use strict";
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });

// Symbol in map
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

// Create class field
class Field {
  constructor(field) {
    // constructor(field) รับแผนที่ (array 2D) ที่ถูกสร้างขึ้นมา
    this.field = field;
    this.positionRow = 0; // positionRow, positionCol บันทึกตำแหน่งปัจจุบันของผู้เล่นเริ่มต้นที่ [0][0]
    this.positionCol = 0; // positionRow, positionCol บันทึกตำแหน่งปัจจุบันของผู้เล่นเริ่มต้นที่ [0][0]
    this.field[this.positionRow][this.positionCol] = pathCharacter; //  this.field[0][0] = "*" กำหนดตำแหน่งเริ่มต้นให้แสดงว่าเคยเดินผ่าน[0][0]
    this.gameOver = false; // this.gameOver เป็นตัวแปรบอกว่าเกมจบหรือยัง
  }

  // Display on map
  print() {
    clear(); // ใช้ clear() เพื่อล้างหน้าจอทุกครั้งก่อนแสดง map ใหม่
  }

  // Receive commands from player
  askMove() {
    const direction = prompt(
      "Which way? (u = up, d = down, l = left, r = right): "
    );
    switch (
      direction.toLowerCase() // ใช้ switch-case เพื่อเรียกฟังก์ชันการเคลื่อนที่ที่สอดคล้องกับอินพุต ถ้าอินพุตไม่ตรงกับตัวเลือกที่ให้ไว้ จะพิมพ์ error message
    ) {
      case "u":
        this.moveUp();
        break;
      case "d":
        this.moveDown();
        break;
      case "l":
        this.moveLeft();
        break;
      case "r":
        this.moveRight();
        break;
      default:
        console.log("Invalid input. Use u, d, l, or r.");
    }
  }

  // Function moving
  moveTo(newRow, newCol) {
    // เช็คว่าตำแหน่งใหม่อยู่นอกแผนที่หรือไม่ → แสดงข้อความและจบเกม
    if (
      newRow < 0 ||
      newCol < 0 ||
      newRow >= this.field.length ||
      newCol >= this.field[0].length
    ) {
      console.log("Out of bounds! Game over.");
      this.gameOver = true;
      return;
    }
  }

  // Direction of movement
  moveUp() {
    this.moveTo(this.positionRow - 1, this.positionCol);
  }

  moveDown() {
    this.moveTo(this.positionRow + 1, this.positionCol);
  }

  moveLeft() {
    this.moveTo(this.positionRow, this.positionCol - 1);
  }

  moveRight() {
    this.moveTo(this.positionRow, this.positionCol + 1);
  }

  // Generate a random map
  static generateField(height, width, holePercentage = 0.2) {
    // สร้างแผนที่ขนาด height x width ที่เติมด้วยพื้น ░
    const field = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(fieldCharacter));
  }
}

// Game Start
const myField = new Field(Field.generateField(5, 10)); // สร้างแผนที่แบบสุ่มขนาด 5x10

// เล่นเกมวนลูปจนกว่าจะชนะ/แพ้/ออกนอก map
while (!myField.gameOver) {
  myField.print();
  myField.askMove();
}
