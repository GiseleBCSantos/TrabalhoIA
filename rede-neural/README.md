# 🧠 Classificação de Grãos com CNN

🔗 [Acesse o notebook no Google Colab](https://colab.research.google.com/drive/1iF4wi6bfb_TDnMz1tsUZbnzJs0pJSTyl?authuser=1)

Este projeto tem como objetivo treinar um modelo de **rede neural convolucional (CNN)** para **classificar grãos de café** em duas categorias: `grãos inteiros` e `grãos quebrados`. O projeto foi desenvolvido no Google Colab com suporte ao Google Drive e bibliotecas de machine learning modernas.

---

## 📁 Estrutura do Projeto

```
📦 /img/dataset/
 ┣ 📂 train/
 ┃ ┣ 📂 grao_inteiro/
 ┃ ┗ 📂 grao_quebrado/
 ┣ 📂 test/
 ┃ ┣ 📂 grao_inteiro/
 ┃ ┗ 📂 grao_quebrado/
```

---

## 🔧 Tecnologias e Bibliotecas

- Python
- NumPy, Matplotlib, Seaborn
- TensorFlow/Keras
- Scikit-learn

---

## ⚙️ Pré-processamento

- Reescalonamento dos pixels (`rescale=1./255`)
- Aumento de dados com:
  - Rotação, zoom, deslocamento e flip horizontal
- Separação de 20% dos dados de treino para validação automática

---

## 🧠 Arquitetura da Rede Neural

A rede neural construída para este projeto é do tipo **Convolutional Neural Network (CNN)** e possui a seguinte estrutura:

- **Entrada**: imagens RGB com tamanho 64x64 pixels.
- **Camadas convolucionais**:
  - 1ª camada: 128 filtros, kernel 3x3, ativação ReLU, seguida de max pooling 2x2 e dropout de 30%.
  - 2ª camada: 64 filtros, kernel 3x3, ativação ReLU, seguida de max pooling 2x2 e dropout de 30%.
  - 3ª camada: 32 filtros, kernel 3x3, ativação ReLU, seguida de max pooling 2x2 e dropout de 30%.
- **Flatten**: achatamento dos mapas de ativação.
- **Camadas densas**:
  - 6 camadas densas sucessivas com 256, 128, 64, 32, 16 e 8 neurônios, todas com ativação ReLU e dropout variando entre 20% e 30%.
- **Saída**: 1 neurônio com ativação sigmoid para classificação binária (`0 = grão quebrado`, `1 = grão inteiro`).

---

## 🏋️‍♀️ Treinamento

- Otimizador: `Adam` com `learning_rate=0.0005`
- Função de perda: `binary_crossentropy`
- Métrica: `accuracy`
- Épocas: `350`
- Uso de `class_weight` para balancear as classes

---

## 📊 Avaliação do Modelo

- **Acurácia no conjunto de teste:** `92,11%`
- **Matriz de Confusão:**
  - Mostra a distribuição de acertos e erros
- **Relatório de Classificação:**
  - Grão Inteiro:
    - Precision: 1.00
    - Recall: 0.86
  - Grão Quebrado:
    - Precision: 0.84
    - Recall: 1.00
- **Métricas Derivadas:**
  - Precisão: 0.84
  - Sensibilidade: 1.00
  - Especificidade: 0.86
  - F1-Score: 0.91

---

## 📈 Gráficos Gerados

- Acurácia e erro por época (train vs validation)
- Matriz de confusão com anotações
- Relatório de classificação (Scikit-learn)

---

## 🗂️ Execução

Para rodar este projeto:

1. Suba os dados no Google Drive no caminho `/Colab Notebooks/img/dataset`
2. Execute o notebook `TrabalhoFinal.ipynb` no Google Colab
3. O código monta o Google Drive automaticamente e treina o modelo com os dados

---

## 📌 Observações

- O modelo pode ser ajustado com técnicas de regularização e tuning de hiperparâmetros.
- Os dados de entrada devem estar organizados em pastas por classe (`grao_inteiro` e `grao_quebrado`).
