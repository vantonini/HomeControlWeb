export interface Transaction {
    id: number;
    transactionDate: Date;
    transactionType: number;
    transactionDes: string;
    storeOriginalName: string;
    storeModifiedName: string;
    categoryID: number;
    categoryName: string;
    value: number;
  }
