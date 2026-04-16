Proje: Yapay Zeka Destekli Kozmetik İçerik Analizi ve Cilt Uyumluluk Sistemi
Proje Tanımı: Bu projede, metin verilerini analiz ederek bir kozmetik ürününün (krem, serum, temizleyici vb.) arka yüzeyinde yazan içerik listesinden (INCI), ürünün hangi cilt profiline (Hassas, Akneye Meyilli, Kuru, Yağlı) hitap ettiğini tahmin edebilen bir yapay zeka sistemi geliştirilecektir. Sistem, kullanıcı tarafından girilen virgülle ayrılmış içerik metnini doğal dil işleme (NLP) teknikleri ile analiz ederek sınıflandırma yapacaktır. Model, kozmetik kimyasallarının (örneğin; niacinamide, hyaluronik asit, parabenler, alkol türevleri) dağılımlarını ve birlikte bulunma kalıplarını öğrenerek ürünün cilde uygunluğunu değerlendirecektir.
Hedef: Doğal dil işleme ve makine öğrenimi tekniklerini kullanarak bir metin sınıflandırma modeli geliştirmek ve bu modeli, kullanıcıların ellerindeki kozmetik ürünlerinin içerik listesini kopyalayıp yapıştırarak hızlıca analiz edebileceği modern bir web arayüzü ile entegre etmek.
Fonksiyonel Gereksinimler:
•	Kullanıcı sisteme bir ürünün içerik listesini metin olarak girebilmelidir (Örn: "Aqua, Glycerin, Niacinamide, Retinol...").
•	Sistem, metin üzerinde otomatik olarak ön işleme adımlarını uygulamalıdır (küçük harfe çevirme, noktalama/virgül temizleme, stopword kaldırma vb.).
•	Model, verilen içerik listesini analiz ederek cilde uyumluluk (Örn: "Hassas Ciltler İçin Riskli", "Kuru Ciltler İçin Güvenli") sınıflandırması yapmalıdır.
•	Sonuçlar kullanıcı dostu bir web arayüzünde (metin giriş alanı, analiz butonu, tahmin sonucu vb.) gösterilmelidir.
Teknik Detaylar:
•	Metin verileri (içerik listeleri) tokenize edilmeli ve sayısal vektörlere dönüştürülmelidir (TF-IDF veya Word2Vec kullanılabilir).
•	Model geliştirme aşamasında Logistic Regression, Random Forest veya Support Vector Machines (SVM) gibi algoritmalar kullanılabilir.
•	Model performansı accuracy, precision, recall ve F1-score metrikleri ile değerlendirilmelidir.
•	Arayüz geliştirme için Streamlit/Gradio kullanılabileceği gibi, sistem performansı ve ürünleştirme vizyonu açısından frontend için React, backend model sunumu için FastAPI/Flask tercih edilebilir.
•	Sistem, kullanıcıdan gelen içerik metnini modele gönderip tahmini gerçek zamanlı olarak gösterebilmelidir.
Kullanılabilecek Veri Setleri:
1.	Sephora Products and Skincare Ingredients Dataset (Kaggle) Gerçek kozmetik ürünlerinin içerik listelerini, marka bilgilerini ve hangi cilt tipine uygun olduklarını barındıran geniş bir veri setidir.
2.	Cosmetics and Chemicals Dataset (Kaggle) Bileşenlerin komedojenik (gözenek tıkayıcı) skorlarını ve tahriş edicilik seviyelerini içeren tamamlayıcı veri setleri.
Değerlendirme Kriterleri:
•	Fonksiyonellik (40%): Veri yükleme, ön işleme ve doğru sınıflandırma işlevlerinin başarıyla çalışması.
•	Kod Kalitesi (20%): Modüler, docstring içeren ve özellikle NLP ön işleme adımlarında optimum çalışan fonksiyonlar.
•	Arayüz (20%): Arayüzün sadeliği, görsel tasarımı ve kullanıcı dostu olması.
•	Dokümantasyon (10%): Açık ve anlaşılır README.md dosyası, kullanım talimatları.
•	Teslim Edilenler (10%): Ekran görüntüsü ve demo videosunun eksiksiz sunulması.
Teslim Edilecekler:
•	GitHub Reposu 
•	Açıklayıcı ve düzenli Readme.md dosyası 
•	Uygulamanın ekran görüntüsü (arayüz ve analiz sonucu) 
•	Python kod dosyaları (Veri temizleme, EDA, Model Eğitimi) ve eğitimli model (.pkl dosyası)

