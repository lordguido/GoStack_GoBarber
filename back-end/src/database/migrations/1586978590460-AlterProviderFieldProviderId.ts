import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, Table } from "typeorm";

export default class AlterProviderFieldProviderId1586978590460 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    //Excluindo a Coluna Provider
    await queryRunner.dropColumn('appointments', 'provider');

    //Adicionando a Colunar Provider ID
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider_id',
      type: 'uuid',
      isNullable: true
    }))

    //Criando Chave Estrangeria
    await queryRunner.createForeignKey('appointments', new TableForeignKey({
      name: 'AppointmentProvider',
      columnNames: ['provider_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //Desfazendo a Chave Estrangeira
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    //Desfazendo a Coluna Provider ID
    await queryRunner.dropColumn('appointments', 'provider_id');

    //Criando a Coluna Provider
    await queryRunner.addColumn('appointments', new TableColumn({
      name: 'provider',
      type: 'varchar'
    }))
  }

}
