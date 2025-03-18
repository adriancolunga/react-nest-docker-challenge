import apiService from './ApiService';

class ContactService {
  async sendMail(contactRequest) {
    await apiService.post('/api/mailer', contactRequest);
  }
}

export default new ContactService();
