import { pluralize } from '../../utils/string-pluralize';
import { capitalize } from '../../utils/string-capitalize';
import { ColType, Column } from './column';
import { String } from 'typescript-string-operations';
import { Resource } from 'src/app/resources/resource';
import { Gender } from 'src/app/api/models/enum/gender.enum';

export class Tables<T> {
  /** @var elementsType Nom du type des éléments à destination des messages */
  private elementsType: string;
  /** @var initData Objet de type T Initialisé */
  private initData: T;
  /** @var datas Tableau contenant tous les éléments récupérés du serveur */
  private datas: T[];
  /** @var columns Colonnes du tableau */
  private colums: Column<ColType>[];
  /** @var paginator Affichage de pagination */
  private paginator: boolean;
  /** @var rows Nombre de lignes par page */
  private rows: number;
  /** @var showCurrentPageReport Affichage du numéro de page */
  private showCurrentPageReport: boolean;
  /** @var tableStyle Classe CSS du tableau */
  private tableStyle: {};
  /** @var currentPageReportTemplate Template du numéro de page */
  private currentPageReportTemplate: string;
  /** @var rowsPerPageOptions Options du nombre de lignes par page */
  private rowsPerPageOptions: number[];
  /** @var dataKey Clé de données */
  private dataKey: string;
  /** @var resizableColumns Redimensionnement des colonnes */
  private resizableColumns: boolean;
  /** @var rowHover Surbrillance des lignes */
  private rowHover: boolean;
  /** @var scrollable Défilement du tableau */
  private scrollable: boolean;
  /** @var scrollHeight Hauteur du défilement */
  private scrollHeight: string;
  /** @var reorderableColumns Reorganisation des colonnes */
  private reorderableColumns: boolean;
  /** @var messages Affichage des labels */
  private messages: {
    modelName: string;
    modelsName: string;
    title: string;
    create: string;
  };
  /** @var export Affichage des boutons d'export */
  private export: {
    csv: boolean;
    csvFiltered: boolean;
    excel: boolean;
    pdf: boolean;
  };

  /**
   * Constructeur de tableaux
   * @param elementsType Nom du type des éléments à destination des messages
   * @param initData Objet de type T Initialisé
   * @param datas Tableau récupérant les éléments issue de l'appel serveur
   * @param columns Colonnes à afficher dans le tableau
   * @param optionnals Options supplémentaires
   */
  constructor(
    elementsType: string,
    initData: T,
    datas: T[],
    columns: Array<Column<ColType>>,
    resources: Resource,
    gender: Gender.m | Gender.f,
    optionnals?: {
      paginator?: boolean;
      rows?: number;
      showCurrentPageReport?: boolean;
      tableStyle?: {};
      currentPageReportTemplate?: string;
      rowsPerPageOptions?: number[];
      dataKey?: string;
      resizableColumns?: boolean;
      reorderableColumns: boolean;
      rowHover?: boolean;
      scrollable?: boolean;
      scrollHeight?: string;
      export?: {
        csv: boolean;
        csvFiltered: boolean;
        excel: boolean;
        pdf: boolean;
      };
    },
  ) {
    this.elementsType = elementsType;
    const typeName: string = elementsType ?? 'élément';
    this.initData = initData;
    this.datas = datas;
    this.colums = columns;
    this.messages = {
      modelName: typeName,
      modelsName: pluralize(typeName),
      title: String.format(
        resources.table.manage,
        capitalize(pluralize(typeName)),
      ),
      create:
        gender == Gender.m
          ? String.format(resources.table.new_format, typeName)
          : String.format(resources.table.newF_format, typeName),
    };

    this.paginator = optionnals?.paginator ?? true;
    this.rows = optionnals?.rows ?? 10;
    this.showCurrentPageReport = optionnals?.showCurrentPageReport ?? true;
    this.tableStyle = optionnals?.tableStyle ?? { width: '100%' };
    this.currentPageReportTemplate =
      optionnals?.currentPageReportTemplate ??
      'Affichage de {first} à {last} sur {totalRecords} ' +
        this.messages.modelsName;
    this.rowsPerPageOptions = optionnals?.rowsPerPageOptions ?? [10, 20, 50];
    this.dataKey = optionnals?.dataKey ?? 'key';
    this.resizableColumns = optionnals?.resizableColumns ?? true;
    this.reorderableColumns = optionnals?.reorderableColumns ?? true;
    this.rowHover = optionnals?.rowHover ?? true;
    this.scrollable = optionnals?.scrollable ?? true;
    this.scrollHeight = optionnals?.scrollHeight ?? '100%';
    this.export = optionnals?.export ?? {
      csv: true,
      csvFiltered: true,
      excel: true,
      pdf: true,
    };
  }

  //#region Columns
  getColumns(): Array<Column<ColType>> {
    return this.colums;
  }

  getColumnsName(): Array<string> {
    return this.colums.map((column) => column.getField());
  }

  setColumns(columns: Array<Column<ColType>>) {
    this.colums = columns;
  }
  //#endregion

  //#region Data
  getInitData(): T {
    return this.initData;
  }

  getDatas(): T[] {
    return this.datas;
  }

  setDatas(datas: T[]) {
    this.datas = datas;
  }
  //#endregion

  //#region Messages
  getMessage(
    property: 'modelName' | 'modelsName' | 'title' | 'create',
  ): string {
    return this.messages[property];
  }

  getMessages(): { modelName: string; modelsName: string } {
    return this.messages;
  }

  setMessage(property: 'modelName' | 'modelsName', message: string) {
    if (property === 'modelName') {
      this.messages.modelsName = pluralize(message);
    }
    this.messages[property] = message;
  }

  setMessages(messages: {
    modelName: string;
    modelsName: string;
    title: string;
    create: string;
  }) {
    this.messages = messages;
  }
  //#endregion

  //#region Options
  getPaginator(): boolean {
    return this.paginator;
  }

  getRows(): number {
    return this.rows;
  }

  getShowCurrentPageReport(): boolean {
    return this.showCurrentPageReport;
  }

  getTableStyle(): {} {
    return this.tableStyle;
  }

  getCurrentPageReportTemplate(): string {
    return this.currentPageReportTemplate;
  }

  getRowsPerPageOptions(): number[] {
    return this.rowsPerPageOptions;
  }

  getDataKey(): string {
    return this.dataKey;
  }

  getResizableColumns(): boolean {
    return this.resizableColumns;
  }

  getReorderableColumns(): boolean {
    return this.reorderableColumns;
  }

  getRowHover(): boolean {
    return this.rowHover;
  }

  getScrollable(): boolean {
    return this.scrollable;
  }

  getScrollHeight(): string {
    return this.scrollHeight;
  }

  getExport(): {
    csv: boolean;
    csvFiltered: boolean;
    excel: boolean;
    pdf: boolean;
  } {
    return this.export;
  }
  //#endregion
}
