import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  @ViewChild('messagesContainer') private messagesContainer: ElementRef | undefined;
  messages: string[] = [];
  userInput: string = '';
  isExpanded: boolean = false; // Variable para controlar la expansión del cuadro de chat

  sendMessage(): void {
    if (this.userInput.trim() !== '') {
      this.messages.push('Tú: ' + this.userInput);
      const botReply = this.botResponse(this.userInput);
      this.messages.push('Bot: ' + botReply);
      this.userInput = '';

      // Scroll hacia abajo para mostrar el último mensaje
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      }
    }
  }

  botResponse(userInput: string): string {
    // Implementa aquí la lógica para generar respuestas del chatbot para un ecommerce
    const lowerCaseInput = userInput.toLowerCase();

    if (lowerCaseInput.includes('hola')) {
      return '¡Hola! Bienvenido a nuestra tienda en línea. ¿En qué puedo ayudarte con tu compra?';
    } else if (lowerCaseInput.includes('precio')) {
      return 'Los precios de nuestros productos pueden variar. Por favor, selecciona un producto para obtener su precio específico.';
    } else if (lowerCaseInput.includes('productos')) {
      return 'Ofrecemos una amplia variedad de productos, como electrónicos, ropa, accesorios y más. ¿En qué categoría estás interesado?';
    } else if (lowerCaseInput.includes('ayuda')) {
      return 'Por supuesto, estoy aquí para ayudarte con tu experiencia de compra. ¿Qué necesitas saber?';
    } else if (lowerCaseInput.includes('comprar') || lowerCaseInput.includes('realizar pedido')) {
      return 'Para realizar una compra, simplemente agrega los productos que desees al carrito y sigue los pasos del proceso de pago. ¿Hay algo específico que quieras comprar?';
    } else {
      return 'Lo siento, no puedo comprender tu mensaje. Por favor, intenta con otra pregunta o consulta relacionada con nuestras tiendas y productos.';
    }
  }

  toggleChat(): void {
    this.isExpanded = !this.isExpanded; // Cambiar el valor de la variable de expansión al hacer clic en el círculo
  }
}
