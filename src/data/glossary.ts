import type { Lang } from '../types/game';

export interface GlossaryEntry {
  en: { definition: string; analogy: string };
  de: { definition: string; analogy: string };
  tr: { definition: string; analogy: string };
  matchTerms: Partial<Record<Lang, string[]>>;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  'VoIP': {
    en: {
      definition: 'Technology that makes voice calls over the internet instead of a phone line.',
      analogy: 'Like a WhatsApp or FaceTime call — uses internet, not a traditional phone network.',
    },
    de: {
      definition: 'Technologie, die Sprachanrufe über das Internet statt über eine Telefonleitung ermöglicht.',
      analogy: 'Wie ein WhatsApp- oder FaceTime-Anruf — nutzt das Internet, kein herkömmliches Telefonnetz.',
    },
    tr: {
      definition: 'Telefon hattı yerine internet üzerinden sesli arama yapan teknoloji.',
      analogy: 'WhatsApp veya FaceTime araması gibi — internet kullanır, geleneksel telefon değil.',
    },
    matchTerms: {
      en: ['VoIP'],
      de: ['VoIP'],
      tr: ['VoIP'],
    },
  },
  'EXIF data': {
    en: {
      definition: 'Hidden information embedded in a photo file: when it was taken, where, and with which device.',
      analogy: "Like a photo's ID card — details you don't see but are always there.",
    },
    de: {
      definition: 'Versteckte Informationen in einer Fotodatei: wann, wo und mit welchem Gerät sie aufgenommen wurde.',
      analogy: 'Wie der Ausweis eines Fotos — Details, die man nicht sieht, aber immer vorhanden sind.',
    },
    tr: {
      definition: 'Bir fotoğraf dosyasına gömülü gizli bilgi: ne zaman, nerede ve hangi cihazla çekildiği.',
      analogy: 'Fotoğrafın kimlik kartı gibi — göremezsiniz ama her zaman oradadır.',
    },
    matchTerms: {
      en: ['EXIF data', 'EXIF metadata'],
      de: ['EXIF-Daten', 'EXIF-Metadaten', 'EXIF data'],
      tr: ['EXIF verisi', 'EXIF data'],
    },
  },
  'GPS metadata': {
    en: {
      definition: 'Location data saved automatically in a file, showing exactly where a photo or message originated.',
      analogy: 'A pin dropped on a map, recorded without you noticing.',
    },
    de: {
      definition: 'Automatisch in einer Datei gespeicherte Standortdaten, die zeigen, wo ein Foto oder eine Nachricht entstanden ist.',
      analogy: 'Eine automatisch gesetzte Nadel auf der Karte — ohne dass man es bemerkt.',
    },
    tr: {
      definition: 'Bir fotoğrafın veya mesajın tam olarak nereden geldiğini gösteren, otomatik kaydedilen konum verisi.',
      analogy: 'Fark etmeden bırakılan harita iğnesi gibi.',
    },
    matchTerms: {
      en: ['GPS metadata', 'GPS coordinates', 'geolocation data'],
      de: ['GPS-Metadaten', 'GPS-Koordinaten', 'GPS metadata'],
      tr: ['GPS metaverisi', 'GPS koordinatları', 'GPS metadata'],
    },
  },
  'Spectrogram': {
    en: {
      definition: 'A visual map of sound that shows which frequencies are present at each moment in time.',
      analogy: 'Like the sound wave display in a music app, but far more detailed — every voice has a unique pattern.',
    },
    de: {
      definition: 'Eine visuelle Karte des Klangs, die zeigt, welche Frequenzen zu jedem Zeitpunkt vorhanden sind.',
      analogy: 'Wie die Schallwelle in einer Musik-App, nur viel detaillierter — jede Stimme hat ein einzigartiges Muster.',
    },
    tr: {
      definition: 'Sesin görsel haritası — her anda hangi frekansların bulunduğunu gösterir.',
      analogy: 'Müzik uygulamasındaki ses dalgası gibi ama çok daha ayrıntılı — her sesin kendine özgü bir deseni vardır.',
    },
    matchTerms: {
      en: ['spectrogram', 'spectral analysis'],
      de: ['Spektrogramm', 'Spektralanalyse', 'spectrogram'],
      tr: ['spektrogram', 'spectrogram'],
    },
  },
  'AI voice cloning': {
    en: {
      definition: 'Artificial intelligence trained on audio samples to generate new speech that sounds exactly like a specific person.',
      analogy: 'A parrot that has listened to millions of voice samples and can now say anything in that voice.',
    },
    de: {
      definition: 'Künstliche Intelligenz, die auf Audioaufnahmen trainiert wird, um neue Sprache zu erzeugen, die genau wie eine bestimmte Person klingt.',
      analogy: 'Ein Papagei, der Millionen Stimmproben gehört hat und nun alles in dieser Stimme sagen kann.',
    },
    tr: {
      definition: 'Belirli bir kişi gibi ses çıkarmak için ses örnekleri üzerinde eğitilmiş yapay zeka.',
      analogy: 'Milyonlarca ses örneği dinleyip artık o sesle her şeyi söyleyebilen bir papağan gibi.',
    },
    matchTerms: {
      en: ['AI voice cloning', 'voice cloning', 'voice synthesis'],
      de: ['KI-Stimmenklonung', 'Stimmenklonung', 'Sprachsynthese', 'voice cloning'],
      tr: ['yapay zeka ses klonlama', 'ses klonlama', 'AI voice cloning'],
    },
  },
  'Synthetic generation': {
    en: {
      definition: 'Content — audio, video, or text — created entirely by a computer algorithm, not by a human.',
      analogy: 'Like a song composed entirely by a computer instead of a musician.',
    },
    de: {
      definition: 'Inhalte — Audio, Video oder Text — die vollständig von einem Computeralgorithmus und nicht von einem Menschen erstellt wurden.',
      analogy: 'Wie ein Lied, das ein Computer statt eines Musikers komponiert hat.',
    },
    tr: {
      definition: 'Bir insan tarafından değil, tamamen bir bilgisayar algoritması tarafından oluşturulan içerik — ses, video veya metin.',
      analogy: 'Bir müzisyen yerine bilgisayarın bestelediği şarkı gibi.',
    },
    matchTerms: {
      en: ['synthetic generation', 'synthetically generated', 'AI-generated'],
      de: ['synthetische Generierung', 'synthetisch generiert', 'KI-generiert', 'synthetic generation'],
      tr: ['sentetik üretim', 'yapay zeka tarafından üretilmiş', 'synthetic generation'],
    },
  },
  'Screenshot': {
    en: {
      definition: 'Saving an exact copy of what is currently displayed on a screen as an image file.',
      analogy: "A memory photo of your screen — captures exactly what you see.",
    },
    de: {
      definition: 'Eine genaue Kopie des aktuellen Bildschirminhalts als Bilddatei speichern.',
      analogy: 'Ein Erinnerungsfoto deines Bildschirms — hält genau das fest, was du siehst.',
    },
    tr: {
      definition: 'Ekranda o anda görüntülenen her şeyin görüntü dosyası olarak kaydedilmesi.',
      analogy: 'Ekranınızın hatıra fotoğrafı — tam olarak gördüğünüzü yakalar.',
    },
    matchTerms: {
      en: ['screenshot'],
      de: ['Screenshot', 'Bildschirmfoto'],
      tr: ['ekran görüntüsü', 'screenshot'],
    },
  },
  // Terms from levels 1–6 clue texts
  'SMS spoofing': {
    en: {
      definition: "Faking the sender name or number in an SMS so it looks like it came from a trusted source.",
      analogy: 'Like writing anyone\'s name on the "From" field of a letter — there\'s no verification.',
    },
    de: {
      definition: 'Den Absendernamen oder die Nummer einer SMS fälschen, damit sie von einer vertrauenswürdigen Quelle zu stammen scheint.',
      analogy: 'Wie jemanden anderen als Absender auf einem Brief eintragen — es gibt keine Überprüfung.',
    },
    tr: {
      definition: 'SMS gönderenin adını veya numarasını taklit ederek güvenilir bir kaynaktan geliyormuş gibi göstermek.',
      analogy: 'Bir mektubun "Gönderen" alanına herhangi birinin adını yazmak gibi — hiçbir doğrulama yok.',
    },
    matchTerms: {
      en: ['SMS spoofing', 'spoofed', 'spoofing'],
      de: ['SMS-Spoofing', 'gefälscht', 'Spoofing', 'spoofed'],
      tr: ['SMS sahtekarlığı', 'sahte', 'spoofing'],
    },
  },
  'Phishing': {
    en: {
      definition: 'Tricking someone into revealing sensitive information by pretending to be a legitimate organisation.',
      analogy: 'Like a fisherman casting a bait-hook — most fish swim past, but some bite.',
    },
    de: {
      definition: 'Jemanden durch eine vorgetäuschte legitime Organisation dazu bringen, sensible Informationen preiszugeben.',
      analogy: 'Wie ein Fischer, der einen Haken auswirft — die meisten Fische schwimmen vorbei, aber manche beißen an.',
    },
    tr: {
      definition: 'Meşru bir kuruluş gibi davranarak birini hassas bilgilerini açıklaması için kandırmak.',
      analogy: 'Yem atan bir balıkçı gibi — çoğu balık geçip gider ama bazıları ısırır.',
    },
    matchTerms: {
      en: ['phishing', 'phishing kit', 'phishing page', 'phishing link'],
      de: ['Phishing', 'Phishing-Kit', 'Phishing-Seite'],
      tr: ['kimlik avı', 'phishing'],
    },
  },
  'Ransomware': {
    en: {
      definition: 'Malicious software that encrypts your files and demands payment to restore access.',
      analogy: 'Someone changes the locks on your house and offers to sell you the new key.',
    },
    de: {
      definition: 'Schadsoftware, die Ihre Dateien verschlüsselt und eine Zahlung verlangt, um den Zugriff wiederherzustellen.',
      analogy: 'Jemand wechselt die Schlösser an Ihrem Haus und bietet an, Ihnen den neuen Schlüssel zu verkaufen.',
    },
    tr: {
      definition: 'Dosyalarınızı şifreleyen ve erişimi geri yüklemek için ödeme talep eden kötü amaçlı yazılım.',
      analogy: 'Birinin evinizin kilidini değiştirip yeni anahtarı size satmayı teklif etmesi gibi.',
    },
    matchTerms: {
      en: ['ransomware', 'LockBit', 'LockBit 3.0'],
      de: ['Ransomware', 'LockBit', 'LockBit 3.0'],
      tr: ['fidye yazılımı', 'ransomware', 'LockBit'],
    },
  },
  'DDoS': {
    en: {
      definition: 'Distributed Denial of Service — flooding a server with so many requests that it becomes unavailable.',
      analogy: "Like thousands of people trying to enter a shop at the same time, blocking the door for real customers.",
    },
    de: {
      definition: 'Distributed Denial of Service — einen Server mit so vielen Anfragen überfluten, dass er nicht mehr erreichbar ist.',
      analogy: 'Wie Tausende Menschen, die gleichzeitig in ein Geschäft wollen und die Tür für echte Kunden blockieren.',
    },
    tr: {
      definition: "Dağıtık Hizmet Engelleme — bir sunucuyu o kadar çok istekle doldurmak ki kullanılamaz hale gelsin.",
      analogy: 'Binlerce kişinin aynı anda bir mağazaya girmeye çalışarak gerçek müşteriler için kapıyı tıklaması gibi.',
    },
    matchTerms: {
      en: ['DDoS', 'UDP flood', 'booter service', 'stresser', 'denial of service'],
      de: ['DDoS', 'UDP-Flood', 'Booter-Dienst', 'Stresser'],
      tr: ['DDoS', 'UDP seli', 'booter', 'stresser'],
    },
  },
  'Credential stuffing': {
    en: {
      definition: 'Automatically testing username/password combinations leaked from one breach across many other sites.',
      analogy: 'Using a stolen key ring to try every lock in the neighbourhood.',
    },
    de: {
      definition: 'Automatisches Testen von aus einem Datenleck stammenden Benutzername/Passwort-Kombinationen auf vielen anderen Websites.',
      analogy: 'Mit einem gestohlenen Schlüsselbund jeden Schlüssel im Viertel ausprobieren.',
    },
    tr: {
      definition: "Bir sızıntıdan ele geçirilen kullanıcı adı/şifre kombinasyonlarını pek çok başka sitede otomatik olarak denemek.",
      analogy: 'Çalınan bir anahtar demetiyle mahalledeki her kilidi denemek gibi.',
    },
    matchTerms: {
      en: ['credential stuffing', 'stuffing attack', 'credential list'],
      de: ['Credential Stuffing', 'Stuffing-Angriff', 'credential stuffing'],
      tr: ['kimlik bilgisi doldurma', 'credential stuffing'],
    },
  },
};

export function getGlossaryEntry(key: string): GlossaryEntry | undefined {
  return GLOSSARY[key];
}
