import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, User, Mail, MessageSquare, Video, ChevronLeft, ChevronRight, X } from "lucide-react";

interface SchedulingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SchedulingModal({ isOpen, onClose }: SchedulingModalProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const today = new Date();

  // Navegação de meses
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
    // Limpar seleção ao trocar de mês
    setSelectedDate("");
    setSelectedTime("");
  };

  // Gerar dias do mês
  const generateCalendarDays = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    
    const days = [];
    
    // Dias em branco para começar no dia correto da semana
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const isCurrentMonth = currentMonth === todayMonth && currentYear === todayYear;
      const isPast = isCurrentMonth && day < todayDate;
      const isToday = isCurrentMonth && day === todayDate;
      const isPastMonth = currentYear < todayYear || (currentYear === todayYear && currentMonth < todayMonth);
      
      days.push({ 
        day, 
        isPast: isPast || isPastMonth, 
        isToday,
        dateString: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      });
    }
    
    return days;
  };

  // Horários disponíveis
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30"
  ];

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const weekDays = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Criar evento do Google Calendar
    const [year, month, day] = selectedDate.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);
    const [hours, minutes] = selectedTime.split(':');
    eventDate.setHours(parseInt(hours), parseInt(minutes));
    
    const endDate = new Date(eventDate);
    endDate.setMinutes(endDate.getMinutes() + 30); // 30 minutos de duração

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Conversa sobre projeto - ' + formData.name)}&dates=${eventDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(`Nome: ${formData.name}\nEmail: ${formData.email}\nMensagem: ${formData.message}`)}&add=phaison.vieira@gmail.com`;

    window.open(googleCalendarUrl, '_blank');
    onClose();
  };

  const calendarDays = generateCalendarDays();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-primary/20 text-white">
        <DialogHeader className="relative">
          <button 
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Agendar Discovery Call
          </DialogTitle>
          <DialogDescription className="text-gray-300 mt-2">
            Vamos conversar sobre seu projeto e como posso te ajudar a alcançar seus objetivos.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-8 mt-6 overflow-y-auto max-h-[calc(95vh-120px)]">
          {/* Calendário */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-semibold flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  Selecionar Data
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigateMonth('prev')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-medium px-4">
                    {monthNames[currentMonth]} {currentYear}
                  </span>
                  <button
                    onClick={() => navigateMonth('next')}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Dias da semana */}
              <div className="grid grid-cols-7 gap-2 text-center text-sm text-gray-400 mb-4">
                {weekDays.map(day => (
                  <div key={day} className="p-2 font-semibold">{day}</div>
                ))}
              </div>

              {/* Dias do mês */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((dayData, index) => (
                  <button
                    key={index}
                    onClick={() => dayData && !dayData.isPast && setSelectedDate(dayData.dateString)}
                    disabled={!dayData || dayData.isPast}
                    className={`
                      h-12 w-12 text-sm rounded-xl transition-all duration-300 font-medium
                      ${!dayData ? 'invisible' : ''}
                      ${dayData?.isPast ? 'text-gray-600 cursor-not-allowed opacity-50' : 'hover:bg-primary/20 hover:scale-105'}
                      ${dayData?.isToday ? 'bg-primary/30 text-primary font-bold' : ''}
                      ${selectedDate === dayData?.dateString ? 'bg-primary text-white shadow-lg shadow-primary/50' : 'text-white/80'}
                    `}
                  >
                    {dayData?.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Horários sempre visíveis */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                Horários Disponíveis
              </h4>
              <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    disabled={!selectedDate}
                    className={`
                      p-3 text-sm rounded-xl border transition-all duration-300 font-medium
                      ${!selectedDate ? 'opacity-50 cursor-not-allowed border-gray-600' : ''}
                      ${selectedTime === time 
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30' 
                        : 'border-white/20 hover:border-primary/50 hover:bg-primary/10 hover:scale-105'
                      }
                    `}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:w-1/2 space-y-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <h4 className="text-xl font-semibold flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                Seus Dados
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nome completo *
                  </label>
                  <Input
                    placeholder="Como você gostaria de ser chamado?"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    E-mail *
                  </label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-12 rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Conte sobre seu projeto
                  </label>
                  <Textarea
                    placeholder="Descreva brevemente seu projeto, objetivos e como posso te ajudar..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 h-24 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Resumo da reunião */}
            {selectedDate && selectedTime && (
              <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-6 border border-primary/30">
                <h5 className="text-lg font-semibold mb-4 text-primary">Resumo da Reunião</h5>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{new Date(selectedDate).toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{selectedTime} - {(() => {
                      const [hours, minutes] = selectedTime.split(':');
                      const endTime = new Date();
                      endTime.setHours(parseInt(hours), parseInt(minutes) + 30);
                      return endTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    })()} (30 min)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Video className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>Google Meet (link será enviado)</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>phaison.vieira@gmail.com</span>
                  </div>
                </div>
              </div>
            )}

            {/* Botão de agendamento */}
            <div className="space-y-4">
              <Button 
                onClick={handleSchedule}
                disabled={!selectedDate || !selectedTime || !formData.name || !formData.email}
                className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 h-12 rounded-xl text-white font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                size="lg"
              >
                Agendar Reunião
              </Button>
              
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Após ser redirecionado, salve o agendamento da reunião no seu Google Calendar.
                Você receberá um e-mail de confirmação com o link da videochamada.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}