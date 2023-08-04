import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { MetricsService } from '../services/metrics.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  @ViewChild('messagesContainer') private messagesContainer: ElementRef | undefined;
  messages: string[] = [];
  userInput: string = '';
  isExpanded: boolean = false; // Variable para controlar la expansión del cuadro de chat

  currentUser: any; // Variable para almacenar el usuario actual
  currentUserSubscription: Subscription | undefined; // Suscripción al BehaviorSubject

  constructor(
    private metricsService: MetricsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Suscribirse al observable para obtener el usuario actual
    this.currentUserSubscription = this.authService.user.subscribe((user) => {
      this.currentUser = user;
      // Cuando el componente se carga o el usuario cambia, enviamos las Page Access Metrics con el nombre de la página 'chatbot'
      this.sendPageAccessMetrics();

      // Aquí puedes hacer lo que necesites con el usuario actual
      // Por ejemplo, mostrar su nombre en el chatbot
      console.log('Usuario actual:', this.currentUser);
      if (this.currentUser) {
        console.log('Nombre del usuario:', this.currentUser.email);
      }
    });
  }

  ngOnDestroy(): void {
    // Asegurarse de desuscribirse cuando el componente se destruye para evitar memory leaks
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

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
// Si ocurre un error en la lógica del chatbot, capturamos el error y enviamos la métrica de error
      try {
        throw new Error('Simulación de un error en la lógica del chatbot');
      } catch (error) {
        this.sendErrorMetrics(error.message);
        return 'Lo siento, ha ocurrido un error en el chatbot. Nuestro equipo ha sido notificado y estamos trabajando en resolverlo. Por favor, intenta nuevamente más tarde.';
      }
    }
  }

  toggleChat(): void {
    this.isExpanded = !this.isExpanded; // Cambiar el valor de la variable de expansión al hacer clic en el círculo
  }

  sendPageAccessMetrics(): void {
    // Si el objeto del usuario contiene el campo 'id', lo usamos para las métricas
    if (this.currentUser && this.currentUser.id !== undefined) {
      const pageName = 'chatbot';
      const timestamp = new Date().toISOString();
      const session_id = this.generateRandomString(10); // Genera una cadena aleatoria de longitud 10
      const abandoned = false;
  
      this.metricsService
        .savePageAccessMetrics({
          page_name: pageName,
          user_id: this.currentUser.id,
          timestamp: timestamp,
          session_id: session_id,
          abandoned: abandoned
        })
        .subscribe(
          () => {
            console.log('Métricas de acceso a la página enviadas correctamente');
          },
          (error) => {
            console.error('Error al enviar las métricas de acceso a la página:', error);
          }
        );
    } else {
      console.warn('ID de usuario no disponible. Métricas de acceso a la página no enviadas.');
    }
  }

  // Genera una cadena aleatoria de longitud especificada
generateRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//Metrica de Error
sendErrorMetrics(errorMessage: string): void {
  // Si el objeto del usuario contiene el campo 'id', lo usamos para las métricas
  if (this.currentUser && this.currentUser.id !== undefined) {
    const timestamp = new Date().toISOString();
    const session_id = this.generateRandomString(10); // Genera una cadena aleatoria de longitud 10

    this.metricsService
      .saveErrorMetrics({
        user_id: this.currentUser.id,
        timestamp: timestamp,
        session_id: session_id,
        error_message: errorMessage
      })
      .subscribe(
        () => {
          console.log('Métrica de error enviada correctamente');
        },
        (error) => {
          console.error('Error al enviar la métrica de error:', error);
        }
      );
  } else {
    console.warn('ID de usuario no disponible. Métrica de error no enviada.');
  }
}

}
