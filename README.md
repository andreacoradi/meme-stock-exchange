DOCUMENTO DI SPECIFICA DEI REQUISITI SOFTWARE


Tabella contenuti

1. Introduzione
	
	1.1 Propositi
  	
	1.2 Obiettivi
  	
	1.3 Definizioni, acronimi e abbreviazioni
2. Descrizione generale
  	
	  2.1 Prospettive del prodotto
 	
	  2.2 Funzionalità del prodotto
  	
	  2.3 Caratteristiche utente
  	
	  2.4 Vincoli generali
  	
	  2.5 Assunzioni e dipendenze
3. Requisiti specifici
  	
	  3.1 Descrizione generale del sistema

	  3.2 Requisiti auth
  	
	  3.3 Requisiti backend
    
	  3.4 Requisiti frontend

	  3.5 Interfaccia utente

	1. Introduzione

     1.1 Propositi

	Il proposito di questo documento è quello di specificare i requisiti del sistema "MemeExchange™️" per facilitarne la realizzazione.
	Questo documento è stato scritto seguendo le indicazioni contenute nel documento 	“IEEE Recommended Practice for Software Requirements Specifications” avente 	riferimento IEEEStd 830-1993 (Revision of IEEE Std 830-1984).

     1.2 Obiettivi

	Si desidera realizzare un'app che simuli una sorta di mercato azionario basato sulla compravendita di azione relative ad un meme, recuperati dal sistema tramite l'API di Reddit.

     1.3 Definizioni, acronimi e abbreviazioni

	API: sono l'insieme delle procedure che un servizio può svolgere che vengono esplementate. 

	Richiesta HTTP: interrogazione di un server da parte di un client per mezzo del protocollo HTTP.

	Risposta HTTP: messaggio inviato al client da parte di un server in seguito ad un'interrogazione del server.

	GET: tipologia di richiesta HTTP, permette di richiedere una determinata risorsa o collezione.

	POST: tipologia di richiesta HTTP, permette di inserire una risorsa o collezione nel server/database. 


	2. Descrizione generale

     2.1 Prospettive del prodotto

	Il sistema informatico "MemeExchange™️" è creato per offrire un' esperienza videoludica che colleghi l'attività di navigazione su un servizio come reddit con la prospettiva di un simulatore del mercato azionario. Il tutto tramite un' interfaccia utente semplice e piacevole alla portata di tutti gli utenti. 
  
     2.2 Funzionalità del prodotto

	Il sistema informatico MemeExchange™️ deve:
			
	- permettere la creazione di un account da parte del l'user;
	- permettere l'accesso al servizio dell'applicazione;
	- permettere al gestore di abilitare gli account tramite dei token di validità;
	- permettere di visualizzare una lista di meme;
	- permettere di comprare un numero a piacere di titoli di mercato;
	- permettere di visualizzare la disponibilità monetaria (PepeCoin) dell'utente;
	- permettere di visualizzare un portfolio dell'utente contenente le azioni acquistate;
	- permettere di vendere le azioni possedute in cambio di crediti (PepeCoin);
	- eliminare un meme dal database dopo 'x' giorno nel caso in cui non presenti nessuna transazione (acquisto/vendita/investimento).

     2.3 Caratteristiche utente

	L’utenza a cui è rivolto il nostro prodotto è l'insieme di amanti dei memes che vogliono sperimentare un'esperienza originale simile a quella proposta dall'app Reddit.

     2.4 Vincoli generali

	Il sistema per funzionare necessita della presenza di una connessione internet nel client e del corretto funzionamento del server presente nel backend.

     2.5 Assunzioni e dipendenze

	Il sistema presenta una dipendenza esterna che proviene dall'utilizzo dell'API di Reddit.

	3. Requisiti specifici

	 3.1 Descrizione generale del sistema

	Il sistema è stato suddiviso in tre diversi componenti che offrono dei servizi specifici all'interno del nostro sistema distribuito.
	
	I tre componenti sono: Auth, Frontend, Backend. 	

	 3.2 Requisiti auth

	Il componente auth ha il compito all'interno del sistema di effettuare l'autorizzazione delle varie richieste che possono essere fatte durante l'utilizzo dell'app.
	
	In primo luogo permette di effettuare la registrazione al servizio, questo avviene tramite una richiesta HTTP dal client contenente le info della registrazione (POST/users -> body{username, password}).
		
	Il componente permette inoltre di accedere al servizio, in questo caso il client invia una rechiesta HTTP ad una risorsa specifica della collezione users ed in cambio riceverà un token necessario per l'abilitazione delle funzionalità dell'applicazione (POST /users/'USERNAME' -> body{password}).  

	L'ultima responsabilità di questo componente consiste nell'autenticazione di ogni singola richiesta del frontend verso il backend, questo avviene tramite un controllo sul token che viene rilasciato durante l'operazione di login. Ogni songola richiesta del frontend dovrà contenere il token nel proprio header in modo che il backend possa poi autenticare la richiesta originaria tramite questo componente (GET /auth -> header{token}).

	 3.3 Requisiti backend

	Questo componente è formato da quattro diversi servizi: API Reddit, Content-Updater, Database, API Meme-Stock.
	
	+ L'API di Reddit permette di attingere ai vari memes per maggior informazioni visitare il sito dell'API [qui](HTTPs://www.reddit.com/dev/API/).

	+ Il content-updater ha il compito di recuperare i meme da Reddit tramite il componente descritto in precedenza; successivamente andrà a collocare i memes ottenuti nel database.

	+ Il database contiene le informazioni relative ai memes, user e investimenti ed ha il compito di fornire i dati necessari per adempire alle richieste provenienti dal frontend.

	+ L'API Meme-Stock fa da intermezzo tra la base di dati e gli altri macrocomponenti.

	In generale il backend si occupa di adempire le richieste del client, per far ciò è necessario un token in ogni singola richiesta che deve essere processata.

	 3.4 Requisiti frontend

	Questo componente è stato realizzato in React tramite l'utilizzo di MaterialDesign Bootstrap in modo da creare una struttura efficiente per la nostra web app sia dal punto di vista strutturale del codice sia dal punto di vista grafico,
	maggiori informazioni su MDBootstrap [qui](HTTPs://mdbootstrap.com/docs/react/)

	Il compito di questo componente è quello di andare a definire la parte di presentazione dell'applicazione definendo struttura e funzionalità, questo perchè l'app presenta una struttura dinamica basata sulle richieste di ogni singolo client.  
	Il frontend permette inoltre di registrarsi e accedere all'applicazione.

	Tutto questo viene realizzato mediante richieste HTTP al backend.  
	(esempio login --> POST /users/'username' {password: 'password'}, questa richiesta avrà come risultato il ricevimento di un token da parte del client inviato dal componente auth)

	 3.5 Interfaccia utente

	 L'applicazione presenta 5 diverse pagine:  
	 + registrazione,
	 + login,
	 + market (home),
	 + myMemes,
	 + ranking.

	La pagina di registrazione presenta due campi di testo nei quali si dovranno inserire un username e una password. Queste informazioni verranno poi inviate al backend per effettuare la registrazione effettiva.

	La pagina di login permette di accedere ai servizi offerti dall'app, sempre tramite l'inserimento di un username e di una password. Tramite una richiesta HTTP l'utente registrato verrà autenticato e otterrà il token di validità.

	La pagina principale conterrà una serie di card all'inerno delle quali troveremo il meme, il titolo del meme, il valore del meme, e una sezione all'interno della quale inserire la quantità di azione che si vorrà comprare.

	La pagina myMemes mostrerà i memes sui quali l'utente ha effettuato un investimento dando la possibilità di acquistare più azioni o venderle per avere un profitto in PepeCoin.

	La pagina ranking permetterà all'utente di visualizzare uno sorta di classifica dei memes in base a nome, valore, numero di azioni, data di pubblicazione.
