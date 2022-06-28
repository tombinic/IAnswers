![Immagine1](https://user-images.githubusercontent.com/91635053/176286088-0bee8a1b-1576-4e22-89af-6111f3be1597.png)


> As part of the Internet Technologies course project, it was decided to develop a platform regarding the concept of Q&A based on artificial intelligence. The following work was done with the TensorFlow.js library with a particular reference to the qna module.
The entire source code is written in **JavaScript**.
You can find informations about qna module at 

>**https://github.com/tensorflow/tfjs-models/tree/master/qna**


## Table of contents
- [IAnswers](#ianswers)
  - [Table of contents](#table-of-contents)
  - :zap:[Quick Start](#quick-start-)
    - [NumPy](https://numpy.org/)
    - [Pandas](https://pandas.pydata.org/)
    - [Matplotlib](https://matplotlib.org)
    - [Shipy](https://docs.scipy.org)
    - [Sklearn](https://scikit-learn.org/stable/)
  - :eyes:[Data exploration](#data-exploration-)
     - [Data visualization](#data-visualization)
     - [Dataset splitting](#dataset-splitting)
  - :hammer_and_wrench:[Preprocessing](#preprocessing-)
     - [Feature selection](#feature-selection)
       - [Mutual information](#mutual-information)
       - [Chi2](#chi2)
     - [Feature scaling](#feature-scaling)
  - :question:[Models comparison](#models-comparison-)
  - :books:[Fine tuning](#fine-tuning-)
  - :white_check_mark:[Evaluation](#evaluation-)
  - :heavy_plus_sign:[Extras](#extras-)

---

## Quick start ⚡

> Libraries that you need to install and import to build this software.
- NumPy
```python
import numpy as np
```
- Pandas 
```python
import pandas as pd
```
- Matplotlib
```python
import matplotlib.pyplot as plt
```
- Shipy
```python
from scipy import stats
```
- Sklearn 
```python
from sklearn.feature_selection import SelectKBest
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import ConfusionMatrixDisplay 
from sklearn.manifold import TSNE 
from sklearn.model_selection import StratifiedKFold
from sklearn.model_selection import train_test_split
from sklearn.feature_selection import mutual_info_classif
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix
```

You can install directly all the libraries with requirements.txt file.
```
pip install -r /path/to/requirements.txt
```

## Data exploration 👀
> Now let's analyze the characteristics of the features.

### Data visualization
The graphs for each feature present in the dataset will be shown below: categorical variables are represented by bar graphs (in blue), while numeric variables are represented by histograms (in green).
```python
def visualize_data(diabetes):
    print("\nPlot graph for each feature\n")
    plt.figure(figsize = (constants.FIGSIZE_X, constants.FIGSIZE_Y))
    for x in range(len(diabetes.columns)):
        plt.subplot(constants.N_PLOT_X, constants.N_PLOT_Y, x + 1)
        if diabetes.columns[x] in numerical_features:
            plt.hist(diabetes[diabetes.columns[x]], facecolor = "g") 
        else:
            diabetes[diabetes.columns[x]].value_counts().sort_index().plot(kind = "bar")
        
        plt.ylabel("N* of occurrences")
        plt.xlabel(diabetes.columns[x])
        plt.xticks(rotation = constants.ROTATION, horizontalalignment = "center")

    plt.subplots_adjust(left = constants.LEFT, bottom = constants.BOTTOM, right = constants.RIGHT, top = constants.TOP, wspace = constants.W_SPACE, hspace = constants.H_SPACE)
    plt.show()
```
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/164088805-7a743c27-1a4d-473a-b1e1-e48d29e201ca.png" alt="alt text" width="500"/>

### Dataset splitting
In this phase, the starting dataset will be partitioned into an 80% training-set and a 20% test-set. The training-set has dimension (56553, 21), the test-set has dimension (14139, 21) and they were created using the keyword stratify so that the latter has the same number of examples for both a class and for the other.
Since the size of the validation-set would be quite large ((56553 * 20) / 100 = 11311), one could opt for a solution without K-Fold Cross-validation. However, by carrying out several tests, it emerged that the results are slightly fluctuating depending on the portion of the validation-set selected during the training phase. Due to this, to obtain an average and balanced solution it was decided to use a StratifieKFold Cross-validation in which, unlike the KFold standard, it is allowed to create a balanced validation-set and a balanced training-set, essential for calculating the metric of accuracy.
```python
def split_dataset(y, X):
    print("\nSplitting dataset\n")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = constants.TEST_SIZE, stratify = y)
    print("Dimension of training-test is: " + str(X_train.shape) + " and " + str(y_train.shape))
    print("Dimension of test-test is: " + str(X_test.shape) + " and " + str(y_test.shape))

    return X_train, X_test, y_train, y_test
```
## Preprocessing 🛠️
### Feature selection
To try to use only the most useful features for forecasting and to partially solve the "Curse of Dimensionality" problem, a feature selection operation is carried out on the entire dataset: analyzes were carried out on both mutual information and CHI2.
```python
def features_selection_MI_CHI2(X, y, mode):
    print("\nFeature selection\n")
    best_features = SelectKBest(score_func = mode, k = "all")
    fit = best_features.fit(X, y)
    df_scores = pd.DataFrame(fit.scores_)
    df_columns = pd.DataFrame(X.columns)
    feature_scores = pd.concat([df_columns, df_scores], axis = 1)
    feature_scores.columns = ['Specs', 'Score']

    plt.figure(figsize = (constants.FIGSIZE_X_FS, constants.FIGSIZE_Y_FS))
    plt.bar([X.columns[i] for i in range(len(best_features.scores_))], best_features.scores_)
    plt.xticks(rotation = constants.ROTATION_FS, horizontalalignment = "center")
    plt.subplots_adjust(left = constants.LEFT_FS, bottom = constants.BOTTOM_FS, right = constants.RIGHT_FS, top = constants.TOP_FS, wspace = constants.W_SPACE_FS, hspace = constants.H_SPACE_FS)
    plt.show()
    return feature_scores
```
#### Mutual information
The most significant features are: HighBP, HighChol, BMI, HeartDiseaseorAttack, GenHlth, PhysHlth, DiffWalk, Age, Income.
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/164091031-ab73511a-debe-4fb7-9bd3-db7ef290c95e.png" alt="alt text" width="500"/>

#### Chi2
The most significant features are: PhysHlth, MentHlth, GenHlth, Age, BMI, DiffWalk, HighBP, Income, HighChol.
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/164091190-75ddc2cf-1f23-4901-8c93-faba15e50134.png" alt="alt text" width="500"/>

In the proposed solution it was chosen to use mutual information: this is due to the fact that with chi2 only linear dependencies would be identified while mutual information allows you to work on negative features (this is not the case) and analyze any type of statistical dependence; the trade-off lies in the higher computational complexity.
So, the features that have been chosen with a score of at least 0.035 are:
- HighBP
- HighChol
- BMI
- GenHlth
- DiffWalk
- Age

```python
def optimal_dataset(score_MI, X):
    print("\nMost important features\n")
    score_ordered = score_MI[score_MI.Score > constants.DIVIDER]
    print(score_ordered)
    for i in X.columns:
        if i not in list(score_ordered.Specs):
            X.pop(i)
    return X
```
### Feature scaling
The feature scaling operation in this specific dataset is not necessary since most of the features are categorical type coded with 0 and 1; subsequently the numerical variables are approximately expressed with values on the same scale.

## Models comparison ❓
> In this section we will analyze and choose the best classification model (with default parameters) on which, subsequently, we will perform fine-tuning of the parameters.
Specifically, to maintain the proportion of 80% training-set and 20% validation-set, the n_splits parameter of the StratifiedKFold Cross-validation is set to 5: this is because 56553/5 = 11311 (the same number that would be obtained by performing 20 % on the training-set).
The advantage of this approach lies in the fact that for each model, at each training iteration, a different portion of validation-set with dimension 11311 is chosen. Once the multiple trainings equal to the value of the n_split parameter have been completed, the accuracy is calculated dividing it by it.
  
```python
def models_comparison(X_train, y_train):
    print("\nSearching best algorithm\n")
    kf = StratifiedKFold(n_splits = constants.N_SPLITS, random_state = None, shuffle = False)
    logistic_regression = LogisticRegression(solver = "liblinear")
    random_forest = RandomForestClassifier()
    ada_boost = AdaBoostClassifier()
    gradient_boosting = GradientBoostingClassifier()
    decision_tree = DecisionTreeClassifier()

    acc_regr, acc_rf, acc_ab, acc_gb, acc_dt = 0, 0, 0, 0, 0

    for train_index, validation_index in kf.split(X_train, y_train):
        xt = X_train.iloc[train_index]
        xv = X_train.iloc[validation_index]
        yt = y_train.iloc[train_index]
        yv = y_train.iloc[validation_index]

        logistic_regression.fit(xt, yt)
        random_forest.fit(xt, yt)
        logistic_regression.fit(xt, yt)
        ada_boost.fit(xt, yt)
        gradient_boosting.fit(xt, yt)
        decision_tree.fit(xt, yt)

        y_pred_vt_regr = logistic_regression.predict(xv)
        y_pred_vt_rf = random_forest.predict(xv)
        y_pred_vt_ab = ada_boost.predict(xv)
        y_pred_vt_gb = gradient_boosting.predict(xv)
        y_pred_vt_dt = decision_tree.predict(xv)

        acc_regr += accuracy_score(yv,  y_pred_vt_regr)
        acc_rf += accuracy_score(yv,  y_pred_vt_rf)
        acc_ab += accuracy_score(yv,  y_pred_vt_ab)
        acc_gb += accuracy_score(yv,  y_pred_vt_gb)
        acc_dt += accuracy_score(yv,  y_pred_vt_dt)
    
    print("Logistic Regression's accuracy: " + str((acc_regr / constants.N_SPLITS) * 100))
    print("Random Forest's accuracy: " + str((acc_rf / constants.N_SPLITS) * 100))
    print("AdaBoost's accuracy: " + str((acc_ab / constants.N_SPLITS) * 100))
    print("GradientBoosting's accuracy: " + str((acc_gb / constants.N_SPLITS) * 100))
    print("Decision Tree's accuracy: " + str((acc_dt / constants.N_SPLITS) * 100))
```
The algorithms used are:
- Logistic Regression
- Decision Tree
- Random Forest
- AdaBoost
- GradientBoosting

The following results were obtained:
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/164094345-7c8ca119-0553-4fc5-a4e3-d206f95b9d40.png" alt="alt text" width="300"/>

## Fine tuning 📚
> At this point, the model on which to carry out fine-tuning operations is GradientBoosting.
Given that the dataset is large, it is preferable to combine Grid Search and Random Search together: initially a Random Search was carried out on the number of trees (n_estimators), displaying the training-set and validation-set graph to establish a possible overfitting or underfitting. The research was performed always performing a StratifiedKFold Cross Validation.
```python
def fine_tuning_gb_rs(X_train, y_train):
    kf = StratifiedKFold(n_splits = constants.N_SPLITS, random_state = None, shuffle = False)
    print("\nRandom Search\n")
    train_results = []
    validation_results = []       
    acc_val, acc_train = 0, 0
    for i in constants.N_TREES:
        acc_val, acc_train = 0, 0
        optimal_gradient_boosting = GradientBoostingClassifier(n_estimators = i)
        for train_index, validation_index in kf.split(X_train, y_train):
            xt = X_train.iloc[train_index]
            xv = X_train.iloc[validation_index]
            yt = y_train.iloc[train_index]
            yv = y_train.iloc[validation_index] 
            optimal_gradient_boosting.fit(xt, yt)
            y_pred_vt_gb = optimal_gradient_boosting.predict(xv)
            y_pred_xt_gb = optimal_gradient_boosting.predict(xt)
            acc_val += accuracy_score(yv, y_pred_vt_gb)
            acc_train += accuracy_score(yt, y_pred_xt_gb)

        train_results.append(acc_train / constants.N_SPLITS)
        validation_results.append(acc_val / constants.N_SPLITS)
        print("Computing " +  str(i) + " with validation accuracy: " + str((acc_val / constants.N_SPLITS) * 100))

    plt.plot(constants.N_TREES, train_results, color = "blue", label = "Training")
    plt.plot(constants.N_TREES, validation_results, color = "red", label = "Validation")
    plt.scatter(constants.N_TREES, validation_results, s = 40, facecolors = "none", edgecolors = "r")
    plt.scatter(constants.N_TREES, train_results, s = 40, facecolors = "none", edgecolors = "b")
    plt.legend()
    plt.show()
```
Initially it was decided to start with high n_estimators parameters: [1000, 5000, 7000, 10000]:
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/164094980-2c7e40c9-84ef-4421-9fdd-054535948c41.png" alt="alt text" width="500"/>

An overfitting situation immediately emerges from the graph above: in fact, the more the trees increase, the more the training accuracy is likely to increase while that in validation decreases. This means that the model tends to "memorize" the training set. At this point it is better to try for a more limited number of n_estimators.
  
Trying with [10, 100, 500, 1000] we obtain the following results:
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/164095807-62984478-a524-47b8-b91b-d0f8e1292d52.png" alt="alt text" width="500"/>
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/164097280-dfb1b7ee-bf65-42b1-b0cf-cfdaf7477808.png" alt="alt text" width="500"/>
  
It is noted that for values <100 the model tends to fall into underfitting, while for values> 100 the situation degenerates towards an overfitting (the accuracy of the training increases, while that of the validation decreases). For this reason, the most suitable values of n_estimators are those around 100.
At this point a Grid-Search is performed (again with StratifiedKFold Cross Validation) both to identify the best number of estimators and to find the most correct regularization parameters. 

```python
def fine_tuning_gb_gs(X_train, y_train):
    print("\nGrid Search\n")
    kf = StratifiedKFold(n_splits = constants.N_SPLITS, random_state = None, shuffle = False)
    for i in range(constants.N_DEFAULT_TREES - 25, constants.N_DEFAULT_TREES + 100, 25):
        for j in range(constants.MAX_DEFAULT_DEPTH, constants.MAX_DEFAULT_DEPTH + 5, 1):
            for h in constants.N_LEARNING_RATE:
                final_gradient_boosting = GradientBoostingClassifier(n_estimators = i, learning_rate = j, max_depth = h)
                for train_index, validation_index in kf.split(X_train, y_train):
                    xt = X_train.iloc[train_index]
                    xv = X_train.iloc[validation_index]
                    yt = y_train.iloc[train_index]
                    yv = y_train.iloc[validation_index]
                    final_gradient_boosting.fit(xt, yt)
                    y_pred_vt_gb = final_gradient_boosting.predict(xv)
                print(str(accuracy_score(yv, y_pred_vt_gb) * 100) + " with trees " + str(i) + ", learning rate " + str(j) + ", max depth " + str(h))
```
  
Those chosen are:
- N_estimators = 125
- Learning_rate = 0.5
- Max_depth = 2

obtaining an accuracy of 75.12%.
  
## Evaluation ✅
Now it is possible to train with the best parameters previously obtained and evaluate the final result no longer on the validation-set, but on the test-set. In addition to accuracy, a confusion matrix is presented.
```python
def final_evaluation_ts(X_train, y_train, X_test, y_test):
    print("\nEvaluation on test-set\n")
    gb = GradientBoostingClassifier(n_estimators = constants.N_ESTIMATORS, learning_rate = constants.LEARNING_RATE, max_depth = constants.MAX_DEPTH)
    gb.fit(X_train, y_train)
    y_pred = gb.predict(X_test)
    print("Final accuracy test set: " + str(accuracy_score(y_test, y_pred) * 100))
    conf_matrix_view = ConfusionMatrixDisplay(confusion_matrix(y_test, y_pred), display_labels = ["negative", "positive"])
    conf_matrix_view.plot()
    conf_matrix_view.ax_.set(title = "Confusion matrix for diabetes", xlabel = "Predicted", ylabel = "Real class")
    plt.show()
```
On the test set an accuracy of 74.90% was obtained.
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/164102646-479696e4-2440-4e2b-9828-690db66187de.png" alt="alt text" width="500"/>
  
## Extras ➕
After the feature selection operation, the selected features became 6. Therefore a dimensionality reduction technique was applied to roughly understand the distribution of individuals with diabetes or not: t-SNE.
If the entire dataset had been given as input to be processed by the t-SNE algorithm, surely there would have been computational problems related to the amount of records. To overcome this problem, the training-set was selected, on which a further selection was made by extracting 5%.
Having thus formed a dataset of 2828 records, t-SNE becomes much less onerous. The proposed visualization is in both 2D and 3D.
```python
def tsne_3d(X_train_tsne, y_train_tsne):
    ax = plt.axes(projection = "3d")
    labels = ["Negative", "Positive"]
    tsne = TSNE(n_components = 3, perplexity = 53, init = "pca", learning_rate = "auto") 
    dim_result = tsne.fit_transform(X_train_tsne) 
    scatter = ax.scatter(dim_result[:, 0], dim_result[:, 1], dim_result[:, 2], c = y_train_tsne)
    handles, _ = scatter.legend_elements(prop = "colors")
    ax.legend(handles, labels)
    plt.show()

def tsne_2d(X_train_tsne, y_train_tsne):
    labels = ["Negative", "Positive"]
    tsne = TSNE(n_components = 2, perplexity = 53, init = "pca", learning_rate = "auto") 
    dim_result = tsne.fit_transform(X_train_tsne) 
    scatter = plt.scatter(dim_result[:, 0], dim_result[:, 1], c = y_train_tsne)
    handles, _ = scatter.legend_elements(prop = "colors")
    plt.legend(handles, labels)
    plt.show()

def subset_for_tsne(X_train, y_train):
    _, X_test_tsne, _, y_test_tsne = train_test_split(X_train, y_train, test_size = constants.TEST_SIZE_TSNE, stratify = y_train)
    return X_test_tsne, y_test_tsne
```
<p align="center">
<img src="https://user-images.githubusercontent.com/91635053/164103228-efa90b4c-4818-4b2d-971a-1042096c42c8.png" alt="alt text" width="500"/>
<img src="https://user-images.githubusercontent.com/91635053/164103238-3f954201-e65d-4552-b789-cb6dc3151cc6.png" alt="alt text" width="300"/>






